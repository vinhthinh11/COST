const Tour = require('../Models/toursSchema');

exports.getAllToursOrTour = async (req, res) => {
  const { page, sort, limit, fields, ...query } = req.query;
  try {
    const queryAwatiy = Tour.find(query);
    // xắp sếp
    if (sort) {
      const sortBy = sort.split(',').join(' ');
      queryAwatiy.sort(sortBy);
    }
    // chon fields to show
    if (fields) {
      const fieldsLimit = fields.split(',').join(' ');
      queryAwatiy.select(fieldsLimit);
    } else {
      queryAwatiy.select('-__v');
    }
    // pagination (phan trang)
    const itemSkip = ((page || 1) - 1) * (limit || 10);
    queryAwatiy.skip(itemSkip).limit(limit || 10);
    const tour = await queryAwatiy;
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
