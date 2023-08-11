const Tour = require('../Models/toursSchema');
const APIFeature = require('../utils/ApiFreature');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAllToursOrTour = catchAsync(async (req, res) => {
  const feature = new APIFeature(Tour.find(), req.query)
    .filter()
    .sortPro()
    .paginate()
    .getField();
  const tour = await feature.query;
  res.status(200).json({ amount: tour.length, tour });
});
exports.getTop5Rating = catchAsync(async (req, res) => {
  const top5 = await Tour.find().limit(5).sort('-ratingsAverage price');
  res.status(200).json({ amount: top5.length, top5 });
});

exports.addTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res
    .status(200)
    .json({ message: 'A tour was susscessfully created', newTour });
});
exports.findTour = catchAsync(async (req, res, next) => {
  const doc = await Tour.findById(req.params.id)
    .populate({
      path: 'guides',
      select: '-__v -role',
    })
    .populate('reviews');
  if (!doc) {
    throw new AppError(404, "Can't find the tour");
  }
  res.status(200).json(doc);
});
exports.updateTour = catchAsync(async (req, res) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    returnDocument: 'after',
  });

  res.status(200).json({ message: 'update tour thanh cong ', tour });
});
exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  if (!tour) {
    throw new AppError(404, "Can't find the tour");
  }
  res.status(200).json({ message: 'xoa tour thanh cong', tour });
});
exports.getTourStats = catchAsync(async (req, res) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: '$difficulty',
        totalTour: { $sum: 1 },
        totalRating: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
  ]);
  res.status(200).json(stats);
});
// xem thu o 1 nam nao do (2021) thi thang nao có nhiều tour du lich nhất, xắp xếp và show ra 5 tháng có lượt đi nhiều nhất :))
exports.getMonthlyPlan = catchAsync(async (req, res) => {
  const year = +req.params.year;
  const monthlyPlan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numOfTourStart: { $sum: 1 },
        tourName: { $push: '$name' },
      },
    },
    { $addFields: { month: '$_id' } },
    { $project: { _id: 0 } },
    { $sort: { numOfTourStart: -1 } },
    // trường limit giới hạn số lượng doc muốn show ra ở đây muốn lấy ra 5 doc được nhiều người book nhất => chọn limit =5
    { $limit: 5 },
    // { $match: { numOfTourStart: { $max } } },
  ]);
  res.status(200).json({ amount: monthlyPlan.length, monthlyPlan });
});
