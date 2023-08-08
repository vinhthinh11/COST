const crypto = require('crypto');
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
  role: {
    type: String,
    enum: ['user', 'tour-guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password too short'],
    select: false,
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
    select: false,
  },
  photo: {
    type: String,
  },
  resetPasswordToken: { type: String, select: false },
  exprirePasswordToken: { type: Date, select: false },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});
user.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
user.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});
user.methods.createPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.exprirePasswordToken = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
user.methods.deleteMe = async function () {
  this.active = false;
  await this.save();
  return this;
};
const userSchema = mongoose.model('User', user);
module.exports = userSchema;
