import express from "express";
import { addReview, approvedReview, deletReview, getReviews } from "../controllers/reviewsController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", addReview);
reviewRouter.get("/", getReviews);
reviewRouter.delete("/:reviewId", deletReview);
reviewRouter.put("/approve/:reviewId", approvedReview);

export default reviewRouter;