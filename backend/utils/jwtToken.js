// creation token and send token

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTtoken();

    // options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.EXPIRE_SECRET_KEYS * 24 * 60 * 60 * 100
        ),
        httpOnly: true
    };
    res.status(statusCode).cookie("token", token, options).json({
        succes: true,
        user,
        token
    })
}

module.exports = sendToken