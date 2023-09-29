const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../Models/toursSchema');
const Booking = require('../Models/bookingSchema');
const catchAsync = require('../utils/catchAsync');
// const handler = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1> Get the current book tour
  const doc = await Tour.findById(req.params.tourID);
  // 2> Create checkout session
  const session = await stripe.checkout.sessions.create({
    success_url: `${req.protocol}://${req.get('host')}/?tour=${
      req.params.tourID
    }&user=${req.user._id}&price=${doc.price}`,
    line_items: [
      {
        price_data: {
          currency: 'vnd',
          product_data: {
            name: doc.name,
            description: doc.summary,
            images: [
              'https://statics.vinpearl.com/chua-linh-ung-da-nang-3.jpg',
              'https://ladybuddha.org/images/linh-ung-pagoda-01.jpg',
              'https://ladybuddha.org/images/linh-ung-pagoda-03.jpg',
            ],
          },
          unit_amount: doc.price * 23000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    cancel_url: `${req.protocol}://${req.get('host')}//api/v1/tours/${
      req.params.tourID
    }`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourID,
  });
  // 3> Send it to client
  res.status(200).json({ status: 'success', session });
});

exports.createBookingCheckout = async (req, res, next) => {
  const { tour, user, price } = req.query;
  if (tour && user && price) {
    // tao record booking
    await Booking.create({ tour, user, price });
    return res.redirect(req.originalUrl.split('?')[0]);
  }
  next();
};
