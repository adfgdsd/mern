const express = require("express");
const router = express.Router();
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetels,
  createProductReview,
  getAllReviews,
  deleteProductRewies,
  getAdminProduct,
} = require("../controller/productController");

const { isAuthencation, authorixeRole } = require("../middleware/auth");

router.route("/products").get(getAllProduct);

router
  .route("/admin/products")
  .get(isAuthencation, authorixeRole("Admin"), getAdminProduct);

router
  .route("/admin/product/new")
  .post(isAuthencation, authorixeRole("Admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthencation, authorixeRole("Admin"), updateProduct)
  .delete(isAuthencation, authorixeRole("Admin"), deleteProduct);

router.route("/product/:id").get(getProductDetels);

router.route("/review").put(isAuthencation, createProductReview);

router
  .route("/reviwes")
  .get(getAllReviews)
  .delete(isAuthencation, deleteProductRewies);

module.exports = router;
