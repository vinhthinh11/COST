const Review = require('../Models/reviewModel');
const handler = require('./handlerFactory');

exports.setTourUserId = (req, res, next) => {
  // dua cac thong tin cua user id va tour id vao trong req.body
  if (!req.body.tour) req.body.tour = req.params.id;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
exports.getAllReviews = handler.getAll(Review);
exports.addReview = handler.createOne(Review);
exports.getReview = handler.findOne(Review);
exports.updateReview = handler.updateOne(Review);
exports.deleteReview = handler.deleteOne(Review);
