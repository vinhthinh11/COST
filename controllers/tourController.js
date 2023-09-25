const multer = require('multer');
const sharp = require('sharp');
const Tour = require('../Models/toursSchema');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const handler = require('./handlerFactory');
// const reviewController = require('./reviewController');
// confiigure multer for upload img of tour
// const upload = multer({ dest: 'public/img/tour' });

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(new AppError(400, 'Chỉ hỗ trợ định dạng ảnh'), false);
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadTourImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);
// upload.array('images', 5);
exports.resizeImages = (req, res, next) => {
  // next();
  console.log(req.files);
};
exports.getAllTour = handler.getAll(Tour);
exports.getTop5Rating = catchAsync(async (req, res) => {
  const top5 = await Tour.find().limit(5).sort('-ratingsAverage price');
  res.status(200).json({ amount: top5.length, top5 });
});

exports.findTour = handler.getOne(Tour, { path: 'reviews' });
exports.addTour = handler.createOne(Tour);
exports.updateTour = handler.updateOne(Tour);
exports.deleteTour = handler.deleteOne(Tour);
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
exports.getTourWithin = catchAsync(async (req, res) => {
  // lay may bien khai bao ben tour qua
  const { distance = 100, latlng = 0, unit = 'km' } = req.params;
  const [lat, lng] = latlng.split(',');
  if (!lat || !lng)
    throw new AppError(400, 'Please provide latitude and longitude');
  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
  const tour = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });
  return res.status(200).json({
    message: 'gui tin nhan thanh cong',
    data: { number: tour.length, tour },
  });
});
exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng = 0, unit = 'km' } = req.params;
  const [lat, lng] = latlng.split(',');
  if (!lat || !lng) {
    next(new AppError(400, 'Please provide latitude and longitude'));
  }
  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [+lng, +lat],
        },
        distanceField: 'distance',
        distanceMultiplier: unit === 'km' ? 0.001 : 0.00062137,
      },
    },
    { $project: { name: 1, distance: 1 } },
  ]);
  return res.status(200).json({
    message: 'gui tin nhan thanh cong',
    data: {
      distances,
    },
  });
});
