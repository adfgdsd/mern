const express = require("express");
const router = express.Router();
const { processPayment, sendStripeApiKey } = require("../controller/paymentController");
const { isAuthencation } = require("../middleware/auth");

router.route("/payment/process").post(isAuthencation, processPayment);
router.route("/stripeapikey").get(isAuthencation, sendStripeApiKey);
module.exports = router;
