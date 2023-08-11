const AppError = require('../utils/AppError');
// refactor code
function sendErrorDev(res, err) {
  res.status(err.codeStatus).json({
    status: err.status,
    message: err.message,
    err: err,
    stack: err.stack,
  });
}
function sendErrorProd(res, err) {
  // check if the error is a operational
  if (err.isOperational) {
    res.status(err.codeStatus).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // eslint-disable-next-line no-console
    console.error('Too bad, somthing went wrong :))', err);
    res.status(err.codeStatus).json({
      status: err.status,
      message: 'something goes very wrong!!',
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
    sendErrorDev(res, err);
    // production enviroment => general message
  } else if (process.env.NODE_ENV === 'production') {
    // handle CastError form mongodb
    let error = { ...err };
    if (err.name === 'CastError') error = handlerCastError(err);
    if (err.code === 11000) error = handlerDuplicateError(err);
    if (err.name === 'ValidationError') error = handlerValidateError(err);
    if (err.name === 'JsonWebTokenError') error = handlerJsonWebTokenError(err);
    if (err.name === 'TokenExpiredError') error = handlerTokenExpiredError(err);
    sendErrorProd(res, error);
  }
};
