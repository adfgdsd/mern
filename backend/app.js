const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const bodyparser = require("body-parser");
const fileupload = require("express-fileupload");
const path = require("path")

// config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({ path: "backend/config/config.env" });
  }
  
app.use(express.json());
app.use(cookieparser());
app.use(bodyparser.urlencoded({extended:true}));
app.use(fileupload());

const errorMiddleware = require("./middleware/error")

// import router 
const product = require("./route/productRoute");
const user = require("./route/userRoute");
const order = require("./route/orderRoute");
const payment = require("./route/paymentRoute");

app.use("/api/v1",product);
app.use("/api/v1",user)
app.use("/api/v1",order)
app.use("/api/v1",payment)

// middleware for error
app.use(errorMiddleware);
app.use(express.static(path.join(__dirname,"../frontend/build")))
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})
module.exports = app;
