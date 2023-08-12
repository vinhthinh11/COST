const Review = require('../Models/reviewModel');
const Tour = require('../Models/toursSchema');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const review = await Review.find(filter);
  if (!review)
    return res.status(400).json({ message: 'Databse has no review' });
  res.status(200).json(review);
});
exports.addReview = catchAsync(async (req, res) => {
  const tourId = req.params.tourId;
  const review = { ...req.body, user: req.user._id, tour: tourId };
  await Review.create(review);
  res.status(201).json(review);
});
exports.getReview = catchAsync(async (req, res) => {
  const review = await Tour.findById(req.params.id)
    .populate('reviews')
    .select('reviews');
  res.status(201).json({ message: 'con co be be', review });
});
exports.updateReview = catchAsync(async (req, res) => {
  res.status(201).json({ message: 'no dau canh tre' });
});
