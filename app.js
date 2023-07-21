// import cac model can thiet de chay chuong trinh
const express = require('express');

const app = express();
const morgan = require('morgan');

// All middleware go here
app.use(express.json());
if (process.env.NODE_ENV === 'developmen') {
  app.use(morgan('dev'));
}
app.use(express.static(`${__dirname}/public`));

// cau truc cua 1 middleware
const tourRoute = require('./routes/tourRoute');
const userRoute = require('./routes/userRoute');

app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/user', userRoute);

module.exports = app;
