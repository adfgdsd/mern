const mongoose = require("mongoose");

const connectDataBase = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
    }).then((d) => {
        console.log("succes" + " " + d.connection.host);
    });
};

module.exports = connectDataBase;