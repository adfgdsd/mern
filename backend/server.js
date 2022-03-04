const app = require("./app");
const cloudinary = require("cloudinary");
const exfileupload = require("express-fileupload");
const connectDataBase = require("./config/database");

// uncaughtException error handleing

process.on("uncaughtException", (e) => {
  console.log(`Error: ${e.message}`);
  console.log("sutting down the server for uncaughtException");

  process.exit(1);
});

// config
if(process.env.NODE_ENV !== "PRODUCTION"){
  require("dotenv").config({ path: "backend/config/config.env" });
}

// dataBase

connectDataBase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// hosting

const server = app.listen(
  process.env.PORT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("succes in port no" + " " + process.env.PORT);
  }
);

// unhandlerejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("sutting down the server for unhendleRejection");

  server.close(() => {
    process.exit(1);
  });
});

// 3:56 M.
