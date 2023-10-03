const mongoose = require('mongoose');
const Product = require('./productSchema');
// const User = require('./userProductSchema');

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
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'UserProduct',
      required: [true, 'review must belong to a user'],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
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
    { path: 'user', select: 'name photo' },
    { path: 'product', select: 'name imageUrl' },
    // { path: 'user', select: 'name photo' },
    // { path: 'tour', select: 'name' },
  ]);
  next();
});
review.statics.calcAverageRating = async function (productId) {
  const stats = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: 'product',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  // trong truong hop khong co review do bi xoa phan findOneAnd luc nay se sinh ra loi do stats = []
  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: stats[0].avgRating,
      ratingsQuantity: stats[0].nRating,
    });
  } else {
    // dua ratingAverage va ratingQuantity ve mac dinh
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: 4.5,
      ratingsQuantity: 0,
      set: val => Math.round(val * 100) / 100,
    });
  }
};
review.post('save', function () {
  this.constructor.calcAverageRating(this.tour);
});

// thay vi phai thuc hien pre and post thi chi can thuc hien o post
review.post(/^findOneAnd/, async doc => {
  if (doc) await doc.constructor.calcAverageRating(doc.product);
});
review.index({ product: 1, user: 1 }, { unique: true });
const Reviews = mongoose.model('ReviewProduct', review);

module.exports = Reviews;
