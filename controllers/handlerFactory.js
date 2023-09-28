// tao 1 handler to handdler regular funtion(trong funtion se bao gom Model, va actions)
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const APIFeature = require('../utils/ApiFreature');

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
/**popOption se la field that you want to populate */
exports.getOne = (Model, popOption) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOption) {
      query = query.populate(popOption);
    }
    const doc = await query;
    if (!doc) {
      throw new AppError(404, "Can't find the doc");
    }
    res.status(200).json({ message: 'Success get data', doc });
  });
exports.getAll = Model =>
  catchAsync(async (req, res) => {
    let filter = {};
    if (req.params.id) filter = { tour: req.params.id };
    const feature = new APIFeature(Model.find(filter), req.query)
      .filter()
      .sortPro()
      .paginate()
      .getField();
    const doc = await feature.query;
    res.status(200).json({ amount: doc.length, doc });
  });
