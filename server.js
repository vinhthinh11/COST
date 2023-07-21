const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const databaseConnectionString = process.env.DATABASE_CONNECTION.replace(
  '<password>',
  process.env.PASSWORD,
);
mongoose
  .connect(databaseConnectionString, { useNewUrlParser: true })
  .then(() => {
    console.log('Ke noi thanh cong');
  });
const app = require('./app');

app.listen(process.env.PORT || 3000, () => {
  console.log('server is running');
});
