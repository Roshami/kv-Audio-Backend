import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";

//loding enviroment variable
dotenv.config();


let app = express()

app.use(bodyParser.json());

//middleware part for token
app.use((req,res,next)=>{
    let token = req.header("Authorization")
    //console.log(token)

    if(token != null){
        token = token.replace("Bearer ", "")
        
        jwt.verify(token,"kv-secert-89!",
            (err,decoded)=>{
                if(!err){
                    //console.log(decoded)
                    req.user = decoded
                }
            }
        )

    }

    next()
});

// strat db conection
let mongourl = process.dotenv.MONGO_URL;

mongoose.connect(mongourl)

let connection = mongoose.connection

connection.once("open", () => {
    console.log("MongoDB connection established succesfully")
})

app.use("/api/users", userRouter)
app.use("/api/products", productRouter)

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})