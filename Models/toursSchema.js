const mongoose = require('mongoose');
const slugify = require('slugify');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tour must has name'],
      unique: true,
      trim: true,
    },
    slug: String,
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
    secretTour: { type: Boolean, default: false },
  },
  {
    id: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
schema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});
// document middle ware run before save
schema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
// schema.pre('save', (next) => {
//   console.log('will save document ...');
//   next();
// });
// schema.post('save', (doc, next) => {
//   console.log(doc);
//   next();
// });
// QUERY middleware ( hay con goi la hook)
schema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});
const toursSchema = mongoose.model('Tours', schema);
module.exports = toursSchema;
