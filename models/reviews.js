import mongoose from "mongoose";

const reviewsSchma = new mongoose.Schema({
    email :{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    rating :{
        type:Number,
        required:true
    },
    comment : {
        type:String,
        required:true
    },
    date :{
        type:Date,
        required : true,
        default:Date.now()
    },
    profilePicture :{
        type:String,
        required:true,
        default : "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
    },
    status :{
        type: String,
        required :true,
        default:"Pending"
    }
})

const Review = mongoose.model("Review", reviewsSchma)

export default Review;

