const User = require('../Models/userSchema');
const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({ message: 'Tao User thanh cong', newUser });
});
