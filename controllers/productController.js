const multer = require('multer');
const sharp = require('sharp');
const Product = require('../Models/productSchema');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(new AppError(400, 'Chỉ hỗ trợ định dạng ảnh'), false);
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadProductUrl = upload.single('imageUrl');
exports.resizeProductUrl = async (req, res, next) => {
  if (req.file) {
    // chuyen tat ca dinh dang sang jpeg
    const filename = `${req.file.originalname.split('.')[0]}.jpeg`;
    req.body.imageUrl = `${filename}`;
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/product/${filename}`);
  }
  next();
};

// tim
exports.findProduct = async (req, res, next) => {
  const doc = await Product.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: 'san pham khong ton tai' });

  res.status(200).json({ message: 'Find product success', doc });
};
exports.findAllProduct = async (req, res, next) => {
  const doc = await Product.find();
  if (!doc)
    return res.status(404).json({ message: 'chua co san pham nao de tim' });

  res.status(200).json({ message: 'Find product success', doc });
};
// them
exports.addProduct = async (req, res, next) => {
  const doc = await Product.create(req.body);
  if (!doc)
    return res.status(404).json({ message: 'Tạo sản phẩm không thành công' });

  res.status(200).json({ message: 'Add product success', doc });
};
// sua
exports.updateProduct = async (req, res, next) => {
  const doc = await Product.findByIdAndUpdate(req.params.id, req.body);
  if (!doc)
    return res.status(404).json({ message: 'Product not found to update' });

  res.status(200).json({ message: 'Update product success', doc });
};
// xoa
exports.deleteProduct = async (req, res, next) => {
  const doc = await Product.findByIdAndDelete(res.params.id);
  if (!doc) return res.status(404).json({ message: 'khong tim thay san pham' });

  res.status(200).json({ message: 'Delete product success', doc });
};
