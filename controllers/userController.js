const User = require('../Models/userSchema');
const catchAsync = require('../utils/catchAsync');

//function cho cac route
exports.getAllUser = catchAsync(async (req, res) => {
  const user = await User.find();
  res.status(200).json({ message: 'Get all user successed', user });
});
exports.createUser = (req, res) => {
  res.status(200).json({ message: 'This route was not defined yet' });
};
exports.updateUser = (req, res) => {
  res.status(200).json({ message: 'This route was not defined yet' });
};
exports.deleteUser = (req, res) => {
  res.status(200).json({ message: 'This route was not defined yet' });
};
exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) res.status(200).json({ message: 'tim thay user thanh cong', user });
  else {
    res.status(404).json({ message: 'Loi ' });
  }
};
