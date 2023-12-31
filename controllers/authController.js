const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../Models/userSchema');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
// const sendEmail = require('../utils/emailSender');
const Email = require('../utils/emailSender');
const UserProduct = require('../Models/userProductSchema');

function createJWTToken(payload) {
  return jwt.sign({ id: payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
}
const createAndSendToken = (user, message, status, res) => {
  const token = createJWTToken(user._id);
  // dau mat khau password = undifinded thi mongoose se khong xuat ra
  user.password = undefined;
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  res.status(status).json({ message, user, token }); //gui gia tri lai cho axios nhan
};
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await UserProduct.create(req.body);
  const url = `${req.protocol}://${req.get('host')}/me`;
  await new Email(newUser, url).sendWelcome();
  createAndSendToken(newUser, 'Tao user moi thanh cong', 200, res);
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const checkuser = await UserProduct.findOne({ email }).select('+password');
  if (!checkuser) throw new AppError(400, 'User not found');
  const checkpassword = await bcrypt.compare(password, checkuser.password);
  if (!checkpassword) {
    throw new AppError(400, 'Wrong password');
  }
  createAndSendToken(checkuser, 'Dang nhap thanh cong', 200, res);
});

// Middlerware protect kiem tra xem ban da dang nhap chua
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token)
    next(new AppError(400, 'Bạn phải đăng nhập để thực hiện chức năng này'));
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await UserProduct.findById(decode.id);
  if (!currentUser) next(new AppError(400, 'User không tồn tại'));
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});
// kiem tra xem user da login vao chua
exports.isLoggedIn = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

      if (decode.exp < Date.now() / 1000) return next();

      const currentUser = await UserProduct.findById(decode.id);
      if (!currentUser) return next();
      res.locals.user = currentUser;
      return next();
    } catch (e) {
      return next();
    }
  }
  next();
};
// Midllerware to check if user is authorization (co phai la admin khong)
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
  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;
    await new Email(user, resetURL).sendResetPassword();
    res.status(200).json({ message: 'Success send email' });
  } catch (err) {
    res.status(400).json({ message: 'gui mail khong thanh cong', err });
  }
});
exports.logOut = (req, res) => {
  // gui cookie moi voi jwt = undefined
  res.cookie('jwt', 'logout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1> lay token from url
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  // 2.tu token di tim user dua theo token( chua hay lam)
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    exprirePasswordToken: { $gt: Date.now() },
  });
  if (!user)
    return next(new AppError(402, 'User dont exist or time is expired'));
  // 3> sau khi qua kiem tra cac buoc tren thi update password cho current user tu body cua page
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.resetPasswordToken = null;
  user.exprirePasswordToken = null;
  await user.save();
  createAndSendToken(user, 'Doi mat khau thanh cong', 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  //1. kiem tra mat khau cu co match khong , neu match thi doi mat khau
  const user = await User.findById(req.user._id).select('+password');
  const checkpassword = await bcrypt.compare(
    req.body.currPassword,
    user.password
  );
  if (!checkpassword) {
    return next(new AppError(404, 'Wrong input current password'));
  }
  if (req.body.password !== req.body.passwordConfirm)
    return next(new AppError(404, 'Mật khẩu không trùng nhau'));
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  createAndSendToken(user, 'Update password susscess', 200, res);
});
