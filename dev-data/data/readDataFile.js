const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Tour = require('../../Models/toursSchema');
const User = require('../../Models/userSchema');
const Review = require('../../Models/reviewModel');

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
const tourfile = path.join(__dirname, 'tours.json');
const userfile = path.join(__dirname, 'users.json');
const reviewfile = path.join(__dirname, 'reviews.json');

// // READFILE sync
const tours = JSON.parse(fs.readFileSync(tourfile, 'utf-8'));
const users = JSON.parse(fs.readFileSync(userfile, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(reviewfile, 'utf-8'));
let schema;
let data;
function inniData(input) {
  if (input === 'User') {
    schema = User;
    data = users;
  } else if (input === 'Tour') {
    schema = Tour;
    data = tours;
  } else {
    schema = Review;
    data = reviews;
  }
}
const importData = async input => {
  inniData(input);
  try {
    await schema.create(data);
    // eslint-disable-next-line no-console
    console.log('Import data successfull');
    mongoose.connection.close();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
const deletaData = async input => {
  inniData(input);
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
