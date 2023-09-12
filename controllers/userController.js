const User = require('../Models/userSchema');
const handler = require('./handlerFactory');

exports.removeBodyPassword = (req, res, next) => {
  // khi khai bao gia tri = undefined thi mongoose se khong thuc hien update cho gia tri do
  // tai vi params.id khong co => de don gian nen them o day de handler no thong nhat
  req.params.id = req.user.id;
  req.body.password = undefined;
  req.body.passwordConfirm = undefined;
  next();
};
//function cho cac route
exports.getAllUser = handler.getAll(User);
exports.createUser = handler.createOne(User);
exports.deleteUser = handler.deleteOne(User);
exports.getUser = handler.findOne(User);
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
