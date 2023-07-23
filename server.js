const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

const databaseConnectionString = process.env.DATABASE_CONNECTION.replace(
  '<password>',
  process.env.PASSWORD,
);
mongoose.connect(databaseConnectionString, { useNewUrlParser: true });

app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log('server is running');
});
