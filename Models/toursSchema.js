const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: [true, 'the tour must has name'] },
  rating: { type: Number, default: 4.5 },
  price: { type: Number, required: [true, 'A tour must has price'] },
});
const toursSchema = mongoose.model('Tours', schema);
exports.model = toursSchema;
