const stripe = require('stripe')(
  'sk_test_51NylCBK3xDlkPhqboqLdVeU6zL90JoRdDgW9fyRPlN18hOCAfVg8bHStp2XGn2BvVuTkKmWM0ynp1qSB9KhIn1zw00jXS40jlZ'
);
const Order = require('../Models/orderSchema');
const Product = require('../Models/productSchema');
const catchAsync = require('../utils/catchAsync');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1> Get the current book tour
  const doc = await Product.findById(req.params.id);
  console.log(req.body.quantity);
  // // 2> Create checkout session
  const session = await stripe.checkout.sessions.create({
    success_url: `${req.protocol}://${req.get('host')}`,
    line_items: [
      {
        price_data: {
          currency: 'vnd',
          product_data: {
            name: doc.name,
            description: doc.description,
            images: [
              'https://statics.vinpearl.com/chua-linh-ung-da-nang-3.jpg',
              'https://ladybuddha.org/images/linh-ung-pagoda-01.jpg',
              'https://ladybuddha.org/images/linh-ung-pagoda-03.jpg',
            ],
          },
          unit_amount: doc.price,
        },
        quantity: req.body.quantity,
      },
    ],
    mode: 'payment',
    cancel_url: `${req.protocol}://${req.get('host')}//api/v1/product/${
      req.params.id
    }`,
    customer_email: req.user.email,
    client_reference_id: req.params.id,
  });
  // 3> Send it to client
  res.status(200).json({ status: 'success', session });
});

exports.createBookingCheckout = async (req, res, next) => {
  const { tour, user, price } = req.query;
  if (tour && user && price) {
    // tao record booking
    await Order.create({ tour, user, price });
    return res.redirect(req.originalUrl.split('?')[0]);
  }
  next();
};

exports.findOrder = async (req, res, next) => {
  const doc = await Order.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: 'san pham khong ton tai' });

  res.status(200).json({ message: 'Find Order success', doc });
};
exports.findAllOrder = async (req, res, next) => {
  const doc = await Order.find();
  if (!doc)
    return res.status(404).json({ message: 'chua co san pham nao de tim' });

  res.status(200).json({ message: 'Find Order success', doc });
};
// them
exports.addOrder = async (req, res, next) => {
  const doc = await Order.create(req.body);
  if (!doc)
    return res.status(404).json({ message: 'tao san pham khong thanh cong' });

  res.status(200).json({ message: 'Add Order success', doc });
};
// sua
exports.updateOrder = async (req, res, next) => {
  const doc = await Order.findByIdAndUpdate(res.params.id, req.body);
  if (!doc)
    return res
      .status(404)
      .json({ message: 'khong tim thay san pham de cap nhat' });

  res.status(200).json({ message: 'Update Order success', doc });
};
// xoa
exports.deleteOrder = async (req, res, next) => {
  const doc = await Order.findByIdAndDelete(res.params.id);
  if (!doc) return res.status(404).json({ message: 'khong tim thay san pham' });

  res.status(200).json({ message: 'Delete Order success', doc });
};
