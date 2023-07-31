const mongoose = require('mongoose');
const validator = require('validator');

const user = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invailid email'],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password too short'],
  },
  passwordConfirm: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
});
const userSchema = mongoose.model('User', user);
module.exports = userSchema;
