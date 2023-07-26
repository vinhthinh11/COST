const Tour = require('../Models/toursSchema');
const APIFeature = require('../utils/ApiFreature');

exports.getAllToursOrTour = async (req, res) => {
  const { page, sort, limit, fields, ...queryString } = req.query;
  try {
    const feature = new APIFeature(Tour.find(), req.query)
      .filter()
      .sortPro()
      .paginate()
      .getField();
    const tour = await feature.query;
    res.status(200).json({ amount: tour.length, tour });
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.getTop5Rating = async (req, res) => {
  try {
    const top5 = await Tour.find().limit(5).sort('-ratingsAverage price');
    res.status(200).json({ amount: top5.length, top5 });
  } catch (error) {
    res.status(404).json(error);
  }
};
exports.addTour = (req, res) => {
  Tour.create(req.body)
    .then((doc) => {
      res
        .status(200)
        .json({ message: 'A tour was susscessfully created', doc });
    })
    .catch((err) => res.status(404).json({ message: err }));
};
exports.findTour = (req, res) => {
  Tour.findById(req.params.id)
    .then((doc) => res.status(200).json(doc))
    .catch((err) => res.status(400).json(err));
};
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      returnDocument: 'after',
    });
    res.status(200).json({ message: 'update tour thanh cong ', tour });
  } catch (error) {
    res.status(404).json(error);
  }
};
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'xoa tour thanh cong', tour });
  } catch (error) {
    res.status(404).json(error);
  }
};
exports.getTourStats = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(404).json(error);
  }
};
exports.getMonthlyPlan = async (req, res) => {
  try {
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
      { $limit: 1 },
      // { $match: { numOfTourStart: { $max } } },
    ]);
    res.status(200).json({ amount: monthlyPlan.length, monthlyPlan });
  } catch (error) {
    res.status(404).json(error);
  }
};
