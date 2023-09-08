// tao 1 handler to handdler regular funtion(trong funtion se bao gom Model, va actions)
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      throw new AppError(404, "Can't find the doc");
    }
    res.status(200).json({ message: 'Delete success', doc });
  });
exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(200).json({ message: 'Create success', doc });
  });
exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      throw new AppError(404, "Can't find the doc");
    }
    res.status(200).json({ message: 'Update success', doc });
  });
