const Order = require('../Models/orderSchema');

// tim
exports.findOrder = async (req, res, next) => {
  const doc = await Order.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: 'san pham khong ton tai' });

  res.status(200).json({ message: 'Find Order success', doc });
};
exports.findAllOrder = async (req, res, next) => {
  const doc = await Order.find();
  if (!doc)
    return res.status(404).json({ message: 'chua co san pham nao de tim' });

  res.status(200).json({ message: 'Find Order success', doc });
};
// them
exports.addOrder = async (req, res, next) => {
  const doc = await Order.create(req.body);
  if (!doc)
    return res.status(404).json({ message: 'tao san pham khong thanh cong' });

  res.status(200).json({ message: 'Add Order success', doc });
};
// sua
exports.updateOrder = async (req, res, next) => {
  const doc = await Order.findByIdAndUpdate(res.params.id, req.body);
  if (!doc)
    return res
      .status(404)
      .json({ message: 'khong tim thay san pham de cap nhat' });

  res.status(200).json({ message: 'Update Order success', doc });
};
// xoa
exports.deleteOrder = async (req, res, next) => {
  const doc = await Order.findByIdAndDelete(res.params.id);
  if (!doc) return res.status(404).json({ message: 'khong tim thay san pham' });

  res.status(200).json({ message: 'Delete Order success', doc });
};
