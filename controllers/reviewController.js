const Review = require('../Models/reviewModel');
const Tour = require('../Models/toursSchema');
const catchAsync = require('../utils/catchAsync');
const handler = require('./handlerFactory');

exports.getAllReviews = catchAsync(async (req, res) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const review = await Review.find(filter);
  if (!review)
    return res.status(400).json({ message: 'Databse has no review' });
  res.status(200).json(review);
});
exports.setTourUserId = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
exports.addReview = handler.createOne(Review);
exports.getReview = catchAsync(async (req, res) => {
  const review = await Tour.findById(req.params.id)
    .populate('reviews')
    .select('reviews');
  res.status(201).json({ message: 'con co be be', review });
});
exports.updateReview = catchAsync(async (req, res) => {
  res.status(201).json({ message: 'no dau canh tre' });
});
exports.deleteReview = handler.deleteOne(Review);
