const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        quantity: { type: Number },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'review must belong to a user'],
    },
    totalPrice: { type: Number, default: 0 },
  },
  {
    timestamps: {
      createdAt: 'created_at',
    },
  }
);
module.exports = mongoose.model('Order', orderSchema);
