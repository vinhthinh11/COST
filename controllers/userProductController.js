const UserProduct = require('../Models/userProductSchema');

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
