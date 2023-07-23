const Tour = require('../Models/toursSchema');

exports.getAllToursOrTour = async (req, res) => {
  const { page, sort, limit, fields, ...query } = req.query;
  console.log(page, sort, limit, fields, query);
  try {
    const tour = await Tour.find(query);
    res.status(200).json({ amount: tour.length, tour });
  } catch (err) {
    res.status(400).json(err);
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
