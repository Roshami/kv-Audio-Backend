import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    key :{
        type:String,
        required:true,
        unique:true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    categary :{
        type:String,
        required:true,
        default : "uncategorized"
    },
    dimentions : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    avalibility : {
        type:Boolean,
        required:true,
        default:true
    }
})

const Product = mongoose.model("Products",productSchema);

export default Product;