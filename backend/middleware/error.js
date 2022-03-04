const ErrorHander = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";

    if (err.name === "CastError") {
        const message = `Resourc not found : ${err.path}`
        err = new ErrorHander(message, 400);
    }

    //  E11000 duplicate key error
    if (err.code === 11000) {
        const message = `duplicate ${Object.keys(err.keyValue)} Enterd`;
        err = new ErrorHander(message, 404)
    }

    // json error
    if (err.name === "JsonWebTokenError") {
        const message = `jsonwebtoken is inviled`
        err = new ErrorHander(message, 400);
    }

    // json error
    if (err.name === "TokenExpiredError") {
        const message = `jsonwebtoken is expired,try again`
        err = new ErrorHander(message, 400);
    }

    res.status(err.statusCode).json({
        succes: false,
        error: err.stack,
    })
}

