const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Tour = require('../../Models/toursSchema');

const envPath = path.join(__dirname, '../../config.env');
dotenv.config({ path: envPath });
const databaseConnectionString = process.env.DATABASE_CONNECTION.replace(
  '<password>',
  process.env.PASSWORD,
);
mongoose
  .connect(databaseConnectionString, { useNewUrlParser: true })
  // eslint-disable-next-line no-console
  .then(() => console.log('ket noi thanh cong'));
const filePath = path.join(__dirname, 'tours-simple.json');

// // READFILE sync
const tours = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const importData = async () => {
  try {
    await Tour.create(tours);
    // eslint-disable-next-line no-console
    console.log('Import data successfull');
    mongoose.connection.close();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
const deletaData = async () => {
  try {
    await Tour.deleteMany();
    // eslint-disable-next-line no-console
    console.log('Delete data successfull');
    mongoose.connection.close();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

if (process.argv[2] === '--import') {
  importData();
}
if (process.argv[2] === '--delete') {
  deletaData();
}
