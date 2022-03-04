const ErrorHander = require("../utils/errorHandler");
const catchErrorAsync = require("./catchErrorAsync");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthencation = catchErrorAsync(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHander("Please Login or Register", 401));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRETKEY);
    req.user = await User.findById(decodedToken.id);
    next()
});

exports.authorixeRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHander(
                    `Role: ${req.user.role} is not allow to access`, 403
                )
            )
        };
        next();
    }
}