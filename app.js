// import cac model can thiet de chay chuong trinh
const path = require('path');
const rateLimit = require('express-rate-limit'); //chan user req too many times per second
const helmet = require('helmet'); //chan ben thu 3 tan cong trang web va setting 1 so header tu dong cho trang web
const express = require('express');
const morgan = require('morgan');
const mongooseSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const xss = require('xss-clean');
// cau truc cua 1 middleware
const tourRoute = require('./routes/tourRoute');
const userRoute = require('./routes/userRoute');
const reviewRoute = require('./routes/reviewRoute');
const viewRoute = require('./routes/viewRoute');

const AppError = require('./utils/AppError');
const ErrorGlobalHandler = require('./controllers/ErrorGlobalHandler');

const app = express();

//setting viewtemplates for app to use
app.set('view engine', 'pug');
//setting duong dan de load templates
app.set('views', path.join(__dirname, 'views'));
// serving static files
app.use(express.static(path.join(__dirname, 'public')));

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

// tourRoute xu ly
app.use('/api/v1/tours', tourRoute);
// userRoute xu ly
app.use('/api/v1/users', userRoute);
// useRoute xu ly review
app.use('/api/v1/reviews', reviewRoute);
// nhung dia chi con lai thi thi se tra lai khong tim thay thong qua middleware
app.use('/', viewRoute);
app.all('*', (req, res, next) => {
  next(
    new AppError(404, `khong tim thay dia chi cho duogn dan ${req.originalUrl}`)
  );
});
// error handling when next(err)
app.use(ErrorGlobalHandler.ErrorHandler);

module.exports = app;
