const mongoose = require('mongoose');
const Tour = require('./toursSchema');

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
review.statics.calcAverageRating = async function (tourId) {
  const stats = await this.aggregate([
    { $match: { tour: tourId } },
    {
      $group: {
        _id: 'tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  console.log(stats);
  await Tour.findByIdAndUpdate(tourId, {
    ratingsAverage: stats[0].avgRating,
    ratingsQuantity: stats[0].nRating,
  });
};
review.post('save', function () {
  this.constructor.calcAverageRating(this.tour);
});
const Reviews = mongoose.model('Review', review);

module.exports = Reviews;
