const mongoose = require('mongoose');

const booking = new mongoose.Schema(
  {
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Require Tour ID for booking'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Require User ID for booking'],
    },
    // Tai vi Tour co the thay doi gia, nen schema nay con co 1  fields price de luu lai gia cua tour luc booking
    price: {
      type: Number,
      required: [true, 'Must provide price for the tour'],
    },
    // neu khong thanh toan qua stripe ma muon tra tien truc tiep =>admin tao form gui, xong add cho booking schema
    isPaid: {
      type: Boolean,
      required: [true, 'Must have paid or not paid'],
      default: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: false } }
);
// populate Tour and user every time queries
booking.pre(/^find/, () => {
  this.populate('user').populate({ path: 'tour', select: 'name' });
});
const Booking = mongoose.model('Booking', booking);
module.exports = Booking;
