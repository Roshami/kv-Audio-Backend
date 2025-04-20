import express from "express";
import { blockOrUnblockUser, getAllUsers, getUser, loginUser, loginWithGoogle, registerUser, sendOTP } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", registerUser);

userRouter.post("/login",loginUser);
userRouter.get("/all",getAllUsers);
userRouter.put("/block/:email",blockOrUnblockUser);
userRouter.post("/google",loginWithGoogle);
userRouter.get("/",getUser);
userRouter.get("/sendOTP", sendOTP);


export default userRouter;