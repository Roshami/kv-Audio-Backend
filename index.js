import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
import reviewRouter from "./routes/reviewRouter.js";
import inquiryRouter from "./routes/inquiryRouter.js";

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
        
        jwt.verify(token,process.env.JWT_SECRET,
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
let mongourl = process.env.MONGO_URL;

mongoose.connect(mongourl)

let connection = mongoose.connection

connection.once("open", () => {
    console.log("MongoDB connection established succesfully")
})

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/inquiries", inquiryRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})


/* Customer
{
  "email": "testuser3@example.com",
  "password": "securePassword123"
}

admin
{
    "email": "testuser6@example.com",
    "password": "securePassword123"

}
*/