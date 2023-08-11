const Review = require('../Models/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res) => {
  const review = await Review.find();
  if (!review)
    return res.status(400).json({ message: 'Databse has no review' });
  res.status(200).json(review);
});
exports.addReview = catchAsync(async (req, res) => {
  const review = { ...req.body, user: req.user._id };
  await Review.create(review);
  res.status(201).json(review);
});
exports.getReview = catchAsync(async (req, res) => {
  res.status(201).json({ message: 'con co be be' });
});
exports.updateReview = catchAsync(async (req, res) => {
  res.status(201).json({ message: 'no dau canh tre' });
});
