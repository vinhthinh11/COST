const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    validate: {
      validator: function (value) {
        return this.password === value;
      },
      message: 'password and comfirmpassword not match second time',
    },
  },
  photo: {
    type: String,
  },
});
const userSchema = mongoose.model('User', user);
user.pre('save', function (next) {
  if (!this.isModified('password')) return next;
  this.password = bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
module.exports = userSchema;
