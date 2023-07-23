const Tour = require('../Models/toursSchema');

exports.getAllToursOrTour = async (req, res) => {
  try {
    const tour = await Tour.find();
    res.status(200).json(tour);
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.addTour = (req, res) => {
  const { name, rating, price } = req.body;
  Tour.create({ name, rating, price })
    .then((doc) => {
      res.status(200).json({ message: 'Tao tour moi thanh cong', doc });
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
