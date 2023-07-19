// import cac model can thiet de chay chuong trinh
const express = require('express');
const app = express();
const morgan = require('morgan');

// All middleware go here
app.use(express.json());
app.use(morgan('dev'));

// cau truc cua 1 middleware
const tourRoute = require('./routes/tourRoute');
const userRoute = require('./routes/userRoute');

app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/user', userRoute);

module.exports = app;
