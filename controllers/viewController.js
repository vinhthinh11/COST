const AppError = require('../utils/AppError');
const Tour = require('../Models/toursSchema');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  // 1> Get all tour data from tour collectiong
  const tours = await Tour.find();
  // 2> Build tour template
  // 3> Send back template to client side
  res.status(200).render('overview', { title: 'All tours', tours });
});
exports.getTourDetail = (req, res) => {
  res.status(200).render('tour', { title: 'Tour details' });
};
