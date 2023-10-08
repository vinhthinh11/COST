const stripe = require('stripe')(
  'sk_test_51NylCBK3xDlkPhqboqLdVeU6zL90JoRdDgW9fyRPlN18hOCAfVg8bHStp2XGn2BvVuTkKmWM0ynp1qSB9KhIn1zw00jXS40jlZ'
);
const Order = require('../Models/orderSchema');
const Product = require('../Models/productSchema');
const UserProduct = require('../Models/userProductSchema');
const catchAsync = require('../utils/catchAsync');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1> Get the current book tour
  const doc = await Product.findById(req.params.id);
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
              `${req.protocol}://${req.get('host')}/img/product/${
                doc.imageUrl
              }`,
            ],
          },
          unit_amount: doc.price,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: doc.quantity,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    cancel_url: `${req.protocol}://${req.get('host')}//api/v1/product/${
      req.params.id
    }`,
    customer_email: req.user.email,
    client_reference_id: `${req.params.id}::${req.body.quantity}`,
  });
  // 3> Send it to client
  res.status(200).json({ status: 'success', session });
});

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
const createOrder = async session => {
  const product = session.client_reference_id.split('::')[0];
  const user = (await UserProduct.findOne({ email: session.customer_email }))
    ._id;
  const quantity = +session.client_reference_id.split('::')[1];
  await Order.create({
    user,
    address: '124 Trần Phú,Đà Nẵng',
    products: { product, quantity },
  });
};
exports.webhookOrder = async (req, res, next) => {
  const endpointSecret = 'whsec_JkvuNVLwaIh9FrBQz6MCtD8Zxz4N8B4C';
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      // eslint-disable-next-line no-case-declarations
      const checkoutSessionCompleted = event.data.object;
      createOrder(checkoutSessionCompleted);
      // Then define and call a function to handle the event checkout.session.completed
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
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
