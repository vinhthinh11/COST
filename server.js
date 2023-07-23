const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './config.env' });
const databaseConnectionString = process.env.DATABASE_CONNECTION.replace(
  '<password>',
  process.env.PASSWORD,
);
mongoose.connect(databaseConnectionString, { useNewUrlParser: true });

app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log('server is running');
});
