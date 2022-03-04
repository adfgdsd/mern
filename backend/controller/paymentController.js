const catchErrorAsync = require("../middleware/catchErrorAsync");
const stripe = require("stripe")(process.env.STRIP_SECRET_KEY);

exports.processPayment = catchErrorAsync(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });
  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchErrorAsync(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIP_API_KEY });
});
