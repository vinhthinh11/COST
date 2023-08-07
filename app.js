// import cac model can thiet de chay chuong trinh
const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/AppError');
const ErrorGlobalHandler = require('./controllers/ErrorGlobalHandler');

const app = express();

// All middleware go here
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.static(`${__dirname}/public`));

// cau truc cua 1 middleware
const tourRoute = require('./routes/tourRoute');
const userRoute = require('./routes/userRoute');
// tourRoute xu ly
app.use('/api/v1/tours', tourRoute);
// userRoute xu ly
app.use('/api/v1/user', userRoute);
// nhung dia chi con lai thi thi se tra lai khong tim thay thong qua middleware
app.all('*', (req, res, next) => {
  next(new AppError(404, `khong tim thay dia chi cho duogn dan ${req.originalUrl}`));
});
// error handling when next(err)
app.use(ErrorGlobalHandler.ErrorHandler);

module.exports = app;
