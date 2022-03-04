const Order = require("../models/orderModels");
const ErrorHander = require("../utils/errorHandler");
const Product = require("../models/productModels");
const catchErrorAsync = require("../middleware/catchErrorAsync");

// created a product

exports.newOrder = catchErrorAsync(async (req, res, next) => {
  const {
    shippinfInfo,
    orderItems,
    payMentInfo,
    itemsPrice,
    taxPrice,
    shipingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippinfInfo,
    orderItems,
    payMentInfo,
    itemsPrice,
    taxPrice,
    shipingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    succes: true,
    order,
  });
});

// get single order detalse

exports.getSingleUser = catchErrorAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    next(new ErrorHander("order not found in this id ", 404));
  }

  res.status(200).json({
    succes: true,
    order,
  });
});

// get loggind order detalse

exports.myOrder = catchErrorAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({
    succes: true,
    orders,
  });
});

// get all user order detalse (*ADMIN*)

exports.getAllOrder = catchErrorAsync(async (req, res, next) => {
  const orders = await Order.find();

  let totaoAmount = 0;
  orders.forEach((order) => {
    totaoAmount += order.totalPrice;
  });

  res.status(200).json({
    succes: true,
    orders,
    totaoAmount,
  });
});

// update order status detalse (*ADMIN*)

exports.updateOrder = catchErrorAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    next(new ErrorHander("order not found", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHander("you have olredy delever this product", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quntaty);
    });
  }

  order.orderStatus = req.body.status;

  if (order.orderStatus === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    succes: true,
  });
});

async function updateStock(id, quntaty) {
  const product = await Product.findById(id);

  product.stock -= quntaty;
  await product.save({ validateBeforeSave: false });
}

// delete order  (*ADMIN*)

exports.deleteOrder = catchErrorAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    next(new ErrorHander("order not found to delete", 404));
  }
  await order.remove();

  res.status(200).json({
    succes: true,
  });
});
