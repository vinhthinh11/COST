const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tour must has name'],
      unique: true,
      trim: true,
    },
    groupSize: {
      type: Number,
      required: [true, 'Tour must has group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'Tour must has difficult'],
    },
    duration: {
      type: Number,
      required: [true, 'Tour must has duration'],
    },
    ratingAvarage: {
      type: Number,
      default: 4.5,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must has price'],
    },
    priceDiscount: {
      type: Number,
      min: 0.1,
      max: 1,
    },
    summary: {
      type: String,
      trim: true,
    },
    descrition: {
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
  },
  { timestamps: true },
);
const toursSchema = mongoose.model('Tours', schema);
module.exports = toursSchema;
