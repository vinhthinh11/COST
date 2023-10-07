const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userProduct = new mongoose.Schema({
  name: {
    type: String,
    default: 'unknown',
    trim: true,
    required: [true, 'Please provide a name'],
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
    enum: ['user', 'tour-guide', 'lead-guide', 'admin', 'guide'],
    default: 'user',
  },
  cart: [
    { items: { type: mongoose.Schema.ObjectId, ref: 'Product' }, qty: Number },
  ],
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
    default: 'default.jpg',
    required: [true, 'user must have a photo'],
  },
  resetPasswordToken: { type: String, select: false },
  exprirePasswordToken: { type: Date, select: false },
  active: {
    type: Boolean,
    default: true,
  },
});
userProduct.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userProduct.methods.createPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.exprirePasswordToken = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
userProduct.methods.deleteMe = async function () {
  this.active = false;
  await this.save();
  return this;
};
const userProductSchema = mongoose.model('UserProduct', userProduct);
module.exports = userProductSchema;
