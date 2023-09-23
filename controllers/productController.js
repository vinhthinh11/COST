const Product = require('../Models/productSchema');

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
exports.addProductReview = async (req, res, next) => {
  const doc = await Product.create(req.body);
  if (!doc)
    return res.status(404).json({ message: 'tao san pham khong thanh cong' });

  res.status(200).json({ message: 'Add product success', doc });
};
// sua
exports.updateProduct = async (req, res, next) => {
  const doc = await Product.findByIdAndUpdate(res.params.id, req.body);
  if (!doc)
    return res
      .status(404)
      .json({ message: 'khong tim thay san pham de cap nhat' });

  res.status(200).json({ message: 'Update product success', doc });
};
// xoa
exports.deleteProduct = async (req, res, next) => {
  const doc = await Product.findByIdAndDelete(res.params.id);
  if (!doc) return res.status(404).json({ message: 'khong tim thay san pham' });

  res.status(200).json({ message: 'Delete product success', doc });
};
