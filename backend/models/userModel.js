const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchima = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "inter your name"],
        maxlength: [30, "name cannot exceed 30 character"],
        minlength: [4, "name cannot exceed 4 character"]
    },
    email: {
        type: String,
        required: [true, "inter your email"],
        unique: true,
        validate: [validator.isEmail, "Please inter a valid email"]
    },
    password: {
        type: String,
        required: [true, "inter your password"],
        minlength: [8, "password must need 8 charactur"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        createdAt:{
            type:Date,
            default:Date.now,
        },
    },
    role: {
        type: String,
        default: "user",
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

//hash password 
userSchima.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    };
    this.password = await bcrypt.hash(this.password, 10);
})

// jwt token

userSchima.methods.getJWTtoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRETKEY, {
        expiresIn: process.env.EXPIRE_SECRET_KEY
    });
};

// compire password 
userSchima.methods.compirePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


// genaret password token 
userSchima.methods.getResetPasswordToken = function () {
    // genaret token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // hasing and ading reset password token
    this.resetPasswordToken = crypto
        .createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 50 * 60 * 1000;
    return resetToken;
}

module.exports = mongoose.model("User", userSchima)