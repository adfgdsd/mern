const express = require("express");
const {
    newOrder,
    myOrder,
    getSingleUser,
    getAllOrder,
    updateOrder,
    deleteOrder
} = require("../controller/orderController");

const router = express.Router();
const { isAuthencation, authorixeRole } = require("../middleware/auth");

router.route("/order/new").post(isAuthencation, newOrder);

router.route("/order/:id").get(isAuthencation, getSingleUser);

router.route("/orders/me").get(isAuthencation, myOrder);

router.route("/admin/orders").get(isAuthencation, authorixeRole("Admin"), getAllOrder);

router.route("/admin/order/:id")
    .put(isAuthencation, authorixeRole("Admin"), updateOrder)
    .delete(isAuthencation, authorixeRole("Admin"), deleteOrder)

module.exports = router;