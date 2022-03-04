const mongoose = require("mongoose");

const productSchima = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Inter a Product Name "],
        trim:true,
    },
    description: {
        type: String,
        required: [true, "Please Inter a Product description "]
    },
    price: {
        type: Number,
        required: [true, "Please Inter a Product price "]
    },
    ratings: {
        type: Number,
        default:0
    },
    images: [{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    }],
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: [true, "Please Inter a Product stock "],
        mixLength:[4,"stock cannot exceed 4 characters"],
        default:1
    },
    NumOfReview:{
        type: Number,
        default:0
    },
    reviews:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true
        },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
        },
        comment:{
            type:String,
            required:true
        },
    }],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model("Product",productSchima);