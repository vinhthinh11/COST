const ReviewProduct = require('../Models/reviewProductSchema');

// tim
exports.findProductReview = async (req, res, next) => {
  const doc = await ReviewProduct.findById(req.params.id);
  if (!doc)
    return res
      .status(404)
      .json({ message: 'khong ton tai review cho san pham nay' });

  res.status(200).json({ message: 'Find review success', doc });
};
// them
exports.addProductReview = async (req, res, next) => {
  const doc = await ReviewProduct.create(req.body);
  if (!doc)
    return res.status(404).json({ message: 'tao san pham khong thanh cong' });

  res.status(200).json({ message: 'Add review success', doc });
};
// sua
exports.updateProductReview = async (req, res, next) => {
  const doc = await ReviewProduct.findByIdAndUpdate(res.params.id, req.body);
  if (!doc)
    return res
      .status(404)
      .json({ message: 'khong tim thay san pham de cap nhat' });

  res.status(200).json({ message: 'Update review success', doc });
};
// xoa
exports.deleteProductReview = async (req, res, next) => {
  const doc = await ReviewProduct.findByIdAndDelete(res.params.id);
  if (!doc) return res.status(404).json({ message: 'khong tim thay san pham' });

  res.status(200).json({ message: 'Delete review success', doc });
};
