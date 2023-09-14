const AppError = require('../utils/AppError');

exports.getOverview = (req, res) => {
  res.status(200).render('overview', { title: 'All tours' });
};
exports.getAllTour = (req, res) => {
  res.status(200).render('overview', { title: 'All tours' });
};
exports.getTourDetail = (req, res) => {
  res.status(200).render('tour', { title: 'Tour details' });
};
