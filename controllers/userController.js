const multer = require('multer'); // handler image
const sharp = require('sharp');
const User = require('../Models/userSchema');
const handler = require('./handlerFactory');
const AppError = require('../utils/AppError');

// 1> Store file on disk
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users/');
//   },
//   filename: (req, file, cb) => {
//     // vi co the co user trung ten voi nhau nen khi luu anh  moi se ghi de len anh cu, load user ra =>sai anh
//     // giai quet thi them id cua current user cho photo
//     // const ext = file.mimetype.split('/')[1];
//     cb(null, `${req.user.id.slice(-5)}-${file.originalname}`);
//   },
// });
// 2> Store file on memory to resize it's size, the image will be stored on buffer (req.file.buffer)
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(new AppError(400, 'Chỉ hỗ trợ định dạng ảnh'), false);
};

const updload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadUserPhoto = updload.single('photo'); // upate cho file photo
exports.resizeUserPhoto = async (req, res, next) => {
  if (req.file) {
    // chuyen tat ca dinh dang sang jpeg
    const filename = `${req.user.id.slice(-5)}-${
      req.file.originalname.split('.')[0]
    }.jpeg`;
    req.file.filename = `${filename}`;
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${filename}`);
  }
  next();
};
exports.removeBodyPassword = (req, res, next) => {
  // khi khai bao gia tri = undefined thi mongoose se khong thuc hien update cho gia tri do
  // tai vi params.id khong co => de don gian nen them o day de handler no thong nhat
  if (req.file) {
    req.body.photo = req.file.filename;
  }
  req.params.id = req.user.id;
  req.body.password = undefined;
  req.body.passwordConfirm = undefined;
  next();
};
//function cho cac route
exports.getAllUser = handler.getAll(User);
exports.createUser = handler.createOne(User);
exports.deleteUser = handler.deleteOne(User);
exports.getUser = handler.getOne(User);
exports.updateMe = handler.updateOne(User);
exports.getMe = (res, req, next) => {
  res.params.id = res.user.id;
  next();
};
exports.deleteMe = async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(200).json({ message: 'User deleted' });
};
exports.updateUser = handler.updateOne(User);
