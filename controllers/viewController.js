const AppError = require('../utils/AppError');
const Tour = require('../Models/toursSchema');
const User = require('../Models/userSchema');
const Booking = require('../Models/bookingSchema');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  // 1> Get all tour data from tour collectiong
  const tours = await Tour.find();
  // 2> Build tour template
  // 3> Send back template to client side
  res.status(200).render('overview', { title: 'All tours', tours });
});
exports.getTourDetail = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const tour = await Tour.findById(id).populate({
    path: 'reviews',
    fields: 'reviews rating user',
  });
  if (!tour) {
    return next(new AppError(404, 'There is no tour'));
  }
  res.status(200).render('tour', { title: `${tour.name} Tour`, tour });
});
exports.getLogin = catchAsync(async (req, res) => {
  res.status(200).render('login', { title: 'Login', login: true });
});
exports.getSignup = catchAsync(async (req, res) => {
  res.status(200).render('signup', { title: 'Signup', signup: true });
});
exports.getProfile = catchAsync(async (req, res) => {
  res.status(200).render('profile', { title: 'Profile' });
});
exports.updateUserData = catchAsync(async (req, res, next) => {
  const doc = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    { new: true, runValidators: true }
  );
  if (!doc) return next(new AppError(400, 'Update khong thanh cong'));
  return res
    .status(200)
    .render('profile', { title: 'User profile', user: doc });
});
exports.getAllMyBookings = async (req, res, next) => {
  // tim tat ca cac booking cua current use
  const bookings = await Booking.find({ user: req.user.id });
  if (bookings.length < 0) return res.status(404).json({ bookings: [] });
  // 2> sau khi tim dc booking cua user thi load cac tour cua user ra
  const tours = bookings.map(booking => booking.tour);
  // 3> co tours render cac tour ra
  return res.status(200).render('overview', { title: 'My booking', tours });
};
