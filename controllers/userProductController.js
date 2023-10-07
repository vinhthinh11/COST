const multer = require('multer'); // handler image
const sharp = require('sharp');
const AppError = require('../utils/AppError');
const UserProduct = require('../Models/userProductSchema');
const handler = require('./handlerFactory');

// 2> Store file on memory to resize it's size, the image will be stored on buffer (req.file.buffer)
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(new AppError(400, 'Chỉ hỗ trợ định dạng ảnh'), false);
};

const updload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadUserPhoto = updload.single('photo'); // update cho file photo va chuyen cac truong khac qua cho req.body
exports.resizeUserPhoto = async (req, res, next) => {
  if (req.file) {
    // chuyen tat ca dinh dang sang jpeg
    const userId = req.user ? req.user.id : req.params.id;
    const filename = `${userId.slice(-5)}-${
      req.file.originalname.split('.')[0]
    }.jpeg`;
    req.body.photo = filename;
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
  req.params.id = req.user.id;
  req.body.password = undefined;
  req.body.passwordConfirm = undefined;
  next();
};

// tim
exports.getUser = async (req, res, next) => {
  const doc = await UserProduct.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: 'san pham khong ton tai' });
  res.status(200).render('./manage_admin/updateUser', {
    title: 'Cập nhật thông tin người dùng',
    doc,
  });
};
exports.getAllUsers = async (req, res, next) => {
  const doc = await UserProduct.find();
  if (!doc)
    return res.status(404).json({ message: 'chua co san pham nao de tim' });

  res.status(200).json({ message: 'Find User success', doc });
};

exports.addUser = async (req, res, next) => {
  const doc = await UserProduct.create(req.body);
  if (!doc)
    return res.status(404).json({ message: 'tao san pham khong thanh cong' });

  res.status(200).json({ message: 'Add User success', doc });
};
// sua
exports.updateMe = handler.updateOne(UserProduct);
// xoa
exports.deleteUser = handler.deleteOne(UserProduct);
