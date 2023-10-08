const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'UserProduct',
      required: [true, 'review must belong to a user'],
    },
    address: { type: String, required: [true, 'order must has a address'] },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    totalPrice: { type: Number, default: 0 },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: false },
  }
);
orderSchema.pre('save', async function (next) {
  await this.populate({ path: 'products.product' });
  this.products.forEach(p => {
    this.totalPrice += p.product.price * p.quantity;
  });
  next();
});
orderSchema.pre(/^find/, async function (next) {
  this.populate({ path: 'user', select: 'email' });
  next();
});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
