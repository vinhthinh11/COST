const AppError = require('../utils/AppError');
// refactor code
function sendErrorDev(req, res, err) {
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.codeStatus).json({
      status: err.status,
      message: err.message,
      err: err,
      stack: err.stack,
    });
  } else {
    res
      .status(err.codeStatus)
      .render('error', { title: 'Lỗi rồ lượm ơi', msg: err.message });
  }
}
function sendErrorProd(req, res, err) {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.codeStatus).json({
        status: err.status,
        message: err.message,
      });
    }
    // eslint-disable-next-line no-console
    return res.status(err.codeStatus).json({
      status: err.status,
      message: 'something goes very wrong!!',
    });
  }
  if (err.isOperational) {
    res
      .status(err.codeStatus)
      .render('error', { title: 'Lỗi rồ lượm ơi', msg: err.message });
  } else {
    // eslint-disable-next-line no-console
    return res.status(err.codeStatus).render('error', {
      title: 'Lỗi rồ lượm ơi',
      msg: 'something went wrong',
    });
  }
}
function handlerCastError(error) {
  const message = `gia tri cua ${error.path} khong dung dinh dang
  gia tri ${error.value} khong the conver sang _id`;
  return new AppError(401, message);
}
function handlerDuplicateError(error) {
  const message = `'${error.keyValue.name}' is already existed`;
  return new AppError(401, message);
}
const handlerValidateError = error => {
  const errMess = Object.values(error.errors)
    .map(el => `${el.path} : ${el.message}`)
    .join('. ');
  const message = `input validattion ${errMess}`;
  return new AppError(401, message);
};
const handlerJsonWebTokenError = () =>
  new AppError(401, 'Invailid token, please login again');
const handlerTokenExpiredError = () =>
  new AppError(401, 'jwt expired, please login again');
exports.ErrorHandler = (err, req, res, next) => {
  err.codeStatus = err.codeStatus || 500;
  err.status = err.status || 'error';
  // with development => detail error
  if (process.env.NODE_ENV === 'development') {
    console.log(err);
    sendErrorDev(req, res, err);
    // production enviroment => general message
  } else if (process.env.NODE_ENV === 'production') {
    // handle CastError form mongodb
    let error = { ...err };
    if (err.name === 'CastError') error = handlerCastError(err);
    if (err.code === 11000) error = handlerDuplicateError(err);
    if (err.name === 'ValidationError') error = handlerValidateError(err);
    if (err.name === 'JsonWebTokenError') error = handlerJsonWebTokenError(err);
    if (err.name === 'TokenExpiredError') error = handlerTokenExpiredError(err);
    sendErrorProd(req, res, error);
  }
};
