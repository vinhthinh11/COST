// import cac model can thiet de chay chuong trinh
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const express = require('express');
const morgan = require('morgan');
const mongooseSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const xss = require('xss-clean');

const AppError = require('./utils/AppError');
const ErrorGlobalHandler = require('./controllers/ErrorGlobalHandler');

const app = express();

// All middleware go here Global
// scrurity HTTP header
app.use(helmet()); //Nen dung tren dau de bao ve server
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// limit requests from 1 ip in an hour
const limmiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message:
    'Too many requests from this IP, please try again in one hour later.',
});
app.use('/api', limmiter);
// body parse( reading data from body)
app.use(express.json({ limit: '10kb' }));
// data sanitization again noSQL injection
app.use(mongooseSanitize());
// data sanitization again XSS injection
app.use(xss());
// prevent polution
app.use(hpp({ whitelist: ['duration'] }));
// serving static files
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
  next(
    new AppError(404, `khong tim thay dia chi cho duogn dan ${req.originalUrl}`)
  );
});
// error handling when next(err)
app.use(ErrorGlobalHandler.ErrorHandler);

module.exports = app;
