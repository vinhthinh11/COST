const User = require('../Models/userSchema');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const handler = require('./handlerFactory');

//function cho cac route
exports.getAllUser = catchAsync(async (req, res) => {
  const user = await User.find();
  if (user.length === 0) throw new AppError(400, 'User database is empty');
  res.status(200).json({ message: 'Get all user successed', user });
});
exports.createUser = (req, res) => {
  res.status(200).json({ message: 'This route was not defined yet' });
};
exports.deleteUser = handler.deleteOne(User);
exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) res.status(200).json({ message: 'tim thay user thanh cong', user });
  else {
    res.status(404).json({ message: 'Loi ' });
  }
};
exports.updateMe = catchAsync(async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { password, passwordConfirm, ...updateFields } = req.body;
  const user = await User.findByIdAndUpdate(req.user._id, updateFields, {
    new: true,
    runValidators: true,
  });
  if (user) return res.status(200).json({ message: 'Updated!!', user });
  throw new AppError(400, 'Update failed');
});
exports.delete = async (req, res) => {
  const user = await User.findOne(req.user._id);
  if (!user) throw new AppError(400, 'User not found');
  await user.deteleMe();
  res.status(200).json({ message: 'User deleted' });
};
exports.deleteMe = async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(200).json({ message: 'User deleted' });
};
exports.updateUser = handler.updateOne(User);
