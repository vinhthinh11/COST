const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Tour = require('../../Models/toursSchema');
const User = require('../../Models/userSchema');

const envPath = path.join(__dirname, '../../config.env');
dotenv.config({ path: envPath });
const databaseConnectionString = process.env.DATABASE_CONNECTION.replace(
  '<password>',
  process.env.PASSWORD
);
mongoose
  .connect(databaseConnectionString, { useNewUrlParser: true })
  // eslint-disable-next-line no-console
  .then(() => console.log('ket noi thanh cong'));
const filePath = path.join(__dirname, 'tours.json');

// // READFILE sync
const tours = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const importData = async input => {
  const schema = input === 'tour' ? Tour : User;
  try {
    await schema.create(tours);
    // eslint-disable-next-line no-console
    console.log('Import data successfull');
    mongoose.connection.close();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
const deletaData = async input => {
  const schema = input === 'tour' ? Tour : User;
  try {
    await schema.deleteMany();
    // eslint-disable-next-line no-console
    console.log('Delete data successfull');
    mongoose.connection.close();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

if (process.argv[2] === '--import') {
  importData(process.argv[3]);
}
if (process.argv[2] === '--delete') {
  deletaData(process.argv[3]);
}
