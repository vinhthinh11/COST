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

review.pre(/^find/, async function (next) {
  this.populate([
    { path: 'user', select: 'name email photo' },
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
  // trong truong hop khong co review do bi xoa phan findOneAnd luc nay se sinh ra loi do stats = []
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: stats[0].avgRating,
      ratingsQuantity: stats[0].nRating,
    });
  } else {
    // dua ratingAverage va ratingQuantity ve mac dinh
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: 4.5,
      ratingsQuantity: 0,
      set: val => Math.round(val * 100) / 100,
    });
  }
};
review.post('save', function () {
  this.constructor.calcAverageRating(this.tour);
});
// Doi voi model moi thi boi vi chi cho thuc hien findOne 1 lan nen cai pre and post 1 trong 2 chi chay 1 lan
// review.pre(/^findOneAnd/, async function (next) {
//   // middleware nay dung cho truong hop update hoac delete review => update lai rating cua tour
//   this.r = await this.findOne().clone();
//   console.log('pre da chay roi');
//   next();
//   return this;
// });
// thay vi phai thuc hien pre and post thi chi can thuc hien o post
review.post(/^findOneAnd/, async doc => {
  if (doc) await doc.constructor.calcAverageRating(doc.tour);
});
review.index({ tour: 1, user: 1 }, { unique: true });
const Reviews = mongoose.model('Review', review);

module.exports = Reviews;
