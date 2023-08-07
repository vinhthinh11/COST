const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../Models/userSchema');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const sendEmail = require('../utils/emailSender');

function createJWTToken(payload) {
  return jwt.sign({ id: payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
}
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = createJWTToken(newUser._id);
  res.status(201).json({ message: 'Tao User thanh cong', newUser, token });
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const checkuser = await User.findOne({ email });
  const checkpassword = await bcrypt.compare(password, checkuser.password);
  if (!checkuser || !checkpassword) {
    return res.json({ message: 'Ten dang nhap hoac mk sai' });
  }
  const token = createJWTToken(checkuser._id);
  res.json({ message: 'Dang nhap thanh cong', token, checkuser });
});
// Middlerware
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) next(new AppError(400, 'Truy cap khong hop le'));
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decode.id);
  req.user = currentUser;
  next();
});
// Midllerware to check if user is authorization
exports.restrict =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError(403, 'Your are not authorize for this job'));
    next();
  };
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new AppError(404, 'Email provide dont exist');
  const resetToken = user.createPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/user/resetPassword/${resetToken}`;
  const message = `Foget your password? then click here to set you password  URL: ${resetURL}`;
  try {
    await sendEmail({
      email: user.email,
      subject: 'reset password',
      message: message,
    });
    res.status(200).json({ message: 'Success send email' });
  } catch (err) {
    res.status(400).json({ message: 'gui mail khong thanh cong', err });
  }
});
exports.resetPassword = (req, res, next) => {
  next();
};
