const multer = require('multer'); // handler image
const sharp = require('sharp');
const User = require('../Models/userSchema');
const handler = require('./handlerFactory');
const AppError = require('../utils/AppError');
const UserProduct = require('../Models/userProductSchema');

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

// tim
exports.findUser = async (req, res, next) => {
  const doc = await UserProduct.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: 'san pham khong ton tai' });

  res.status(200).json({ message: 'Find product success', doc });
};
exports.findAllUser = async (req, res, next) => {
  const doc = await UserProduct.find();
  if (!doc)
    return res.status(404).json({ message: 'chua co san pham nao de tim' });

  res.status(200).json({ message: 'Find User success', doc });
};
// them
exports.addUser = async (req, res, next) => {
  const doc = await UserProduct.create(req.body);
  if (!doc)
    return res.status(404).json({ message: 'tao san pham khong thanh cong' });

  res.status(200).json({ message: 'Add User success', doc });
};
// sua
exports.updateUser = async (req, res, next) => {
  const doc = await UserProduct.findByIdAndUpdate(res.params.id, req.body);
  if (!doc)
    return res
      .status(404)
      .json({ message: 'khong tim thay san pham de cap nhat' });

  res.status(200).json({ message: 'Update User success', doc });
};
// xoa
exports.deleteUser = async (req, res, next) => {
  const doc = await UserProduct.findByIdAndDelete(res.params.id);
  if (!doc) return res.status(404).json({ message: 'khong tim thay san pham' });

  res.status(200).json({ message: 'Delete User success', doc });
};
