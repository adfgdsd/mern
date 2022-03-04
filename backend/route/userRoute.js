const express = require("express");
const {
  registerUser,
  userLogin,
  logout,
  ForgetPassword,
  resetPassword,
  getUserDetals,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserole,
  deleteUser,
} = require("../controller/userContorller");
const { isAuthencation, authorixeRole } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(userLogin);
router.route("/password/forgot").post(ForgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthencation, getUserDetals);
router.route("/password/update").put(isAuthencation, updatePassword);
router.route("/me/update").put(isAuthencation, updateProfile);
router
  .route("/admin/user")
  .get(isAuthencation, authorixeRole("Admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthencation, authorixeRole("Admin"), getSingleUser)
  .put(isAuthencation, authorixeRole("Admin"), updateUserole)
  .delete(isAuthencation, authorixeRole("Admin"), deleteUser);

module.exports = router;
