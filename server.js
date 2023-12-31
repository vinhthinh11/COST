const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

const databaseConnectionString = process.env.DATABASE_CONNECTION.replace(
  '<password>',
  process.env.PASSWORD
);
mongoose.connect(databaseConnectionString, { useNewUrlParser: true });

const server = app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(
    `running in ${process.env.NODE_ENV} mode http://localhost:${process.env.PORT}/products`
  );
});
// xy ly unhandledRejection
process.on('unhandledRejection', err => {
  // eslint-disable-next-line no-console
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
process.on('uncaughtException', err => {
  // eslint-disable-next-line no-console
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
