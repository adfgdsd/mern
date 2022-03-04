const ErrorHander = require("../utils/errorHandler");
const asyncFunError = require("../middleware/catchErrorAsync");
const sendToken = require("../utils/jwtToken");
const SendEamil = require("../utils/SendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

const User = require("../models/userModel");

// Register a user
exports.registerUser = asyncFunError(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  sendToken(user, 201, res);
});

// login user

exports.userLogin = asyncFunError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHander("plese inter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Inviled email or password", 400));
  }

  const isPasswordMatch = await user.compirePassword(password);
  // console.log(isPasswordMatch);
  if (!isPasswordMatch) {
    return next(new ErrorHander("Inviled email or password", 400));
  }

  sendToken(user, 200, res);
});

// logout user

exports.logout = asyncFunError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    succes: true,
    message: "Logged Out Succes",
  });

  next();
});

// Forget Password

exports.ForgetPassword = asyncFunError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not found!", 404));
  }
  // get reset password token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;
  const message = `Your password reset token is :- ${resetPasswordUrl}\n\n you have not request fro this message then,please ignore it`;

  try {
    await SendEamil({
      email: user.email,
      subject: `Ecommers`,
      message,
    });
    res.status(200).json({
      succes: true,
      message: "Emial send to " + user.email + " succesfuly",
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHander(error.message, 404));
  }
});

// resewtPassword

exports.resetPassword = asyncFunError(async (req, res, next) => {
  //    creation hasing token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() + 100 },
  });

  if (!user) {
    next(new ErrorHander("reset password token is expired", 404));
  }

  if (req.body.password != req.body.confrumPassword) {
    next(new ErrorHander("Password not match", 404));
  }

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// get user detalse

exports.getUserDetals = asyncFunError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    succes: true,
    user,
  });
});

// update user password

exports.updatePassword = asyncFunError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatch = await user.compirePassword(req.body.Oldpassword);

  if (!isPasswordMatch) {
    return next(new ErrorHander("old password is rong", 400));
  }

  if (req.body.NewPassword !== req.body.confrumPassword) {
    return next(new ErrorHander("password not match", 400));
  }

  user.password = req.body.NewPassword;
  await user.save();

  sendToken(user, 200, res);
});

// update user detalse

exports.updateProfile = asyncFunError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // we will add cloudinary letter
  if (req.body.avatar !== "undefined") {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// admin works

// get single users (**ADMIN**)

exports.getAllUsers = asyncFunError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    succes: true,
    users,
  });
});

// get single users (**ADMIN**)

exports.getSingleUser = asyncFunError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHander("user dosen't exist with id", 400));
  }

  res.status(200).json({
    succes: true,
    user,
  });
});

// update user role (*ADMIN*)

exports.updateUserole = asyncFunError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!user) {
    return next(new ErrorHander("user not found", 404));
  }

  res.status(200).json({
    succes: true,
  });
});

// delete user (*ADMIN*)

exports.deleteUser = asyncFunError(async (req, res, next) => {
  // we will remove cloudenary

  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHander("user not found", 404));
  }
  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    succes: true,
    message: "user remove succesfuly",
  });
});
