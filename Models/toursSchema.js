const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tour must has name'],
      unique: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, 'Tour must has duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Tour must has group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'Tour must has difficult'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must has price'],
    },
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Tour must has description'],
      trim: true,
    },
    imageCover: {
      type: String,
      trim: true,
      required: [true, 'Tour must has image cover'],
    },
    images: {
      type: [String],
      required: [true, 'Tour must has at least one image'],
    },
    startDates: {
      type: [Date],
    },
    priceDiscount: {
      type: Number,
    },
  },
  { id: false },
);
const toursSchema = mongoose.model('Tours', schema);
module.exports = toursSchema;
