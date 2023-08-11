const mongoose = require('mongoose');

const review = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    review: { type: String },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'review must belong to a user'],
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tours',
      required: [true, 'review must belong to a tour'],
    },
  },
  {
    id: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

review.pre(/^find/, function (next) {
  this.populate([
    { path: 'user', select: 'name email' },
    // { path: 'tour', select: 'name' },
  ]);
  next();
});
const Reviews = mongoose.model('Review', review);

module.exports = Reviews;
