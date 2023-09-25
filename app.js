// import cac model can thiet de chay chuong trinh
const path = require('path');
const rateLimit = require('express-rate-limit'); //chan user req too many times per second
const helmet = require('helmet'); //chan ben thu 3 tan cong trang web va setting 1 so header tu dong cho trang web
const express = require('express');
const morgan = require('morgan');
const mongooseSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser'); //chuyen cookie tu res sang store trong local cookie

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
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});
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
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
// use cookie send back from server
app.use(cookieParser());

// data sanitization again noSQL injection
app.use(mongooseSanitize());
// data sanitization again XSS injection
app.use(xss());
// prevent polution
app.use(hpp({ whitelist: ['duration'] }));

// This route for project COST 435
const productRoute = require('./routes/productRoute');
const reviewProductRoute = require('./routes/reviewProductRoute');
const userProductRoute = require('./routes/userProductRoute');
const orderRoute = require('./routes/orderRoute');

app.use('/api/v1/product', productRoute);
app.use('/api/v1/userProduct', userProductRoute);
app.use('/api/v1/productReview', reviewProductRoute);
app.use('/api/v1/order', orderRoute);

// tourRoute xu ly
app.use('/api/v1/tours', tourRoute);
// userRoute xu ly
app.use('/api/v1/users', userRoute);
// useRoute xu ly review
app.use('/api/v1/reviews', reviewRoute);

// TO DO cam trien khai them 2 route cho productReview va product Route

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
