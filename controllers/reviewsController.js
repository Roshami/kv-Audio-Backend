import { decode } from "jsonwebtoken";
import Review from "../models/reviews.js";

export function addReview(req, res) {
    if (req.user == null) {
        res.status(401).json({
            message: "Please login and try again"
        })
        return
    }

    if (req.user.role != "Addmin") {
        res.status(403).json({
            message: "You are not authorized to add a review"
        })
        return
    }

    if (req.user !== null) {
        const decode = jwt.decode({
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email,
            profilePicture: req.user.profilePicture
        }, process.env.JWT_SECRET);

        if (decode == null) {
            res.status(401).json({
                message: "Please login and try again"
            })
            return
        }        
    }

    const data = decode;

    data.name = req.user.firstName + " " + req.user.lastName
    data.profilePicture = req.user.profilePicture
    data.email = req.user.email


    const newReview = new Review(data);

    newReview.save().then(() => {
        res.json({
            message: "Review added successfully"
        })
    }).catch(() => {
        res.status(500).json({
            message: "Review additon failed"
        })
    })

}

export function getReviews(req, res) {

    const user = req.user

    if (user == null || user.role != "Admin") {
        Review.find({
            isApproved: true
        }).then(
            (reviews) => {
                res.json(reviews)
            })
        return
    }

    if (user.role == "Admin") {
        Review.find().then(
            (reviews) => {
                res.json(reviews);
            }
        )
    }
}

export function deletReview(req, res) {
    const email = req.params.email;

    if (req.user == null) {
        res.status(401).json({
            message: "Please loging and try again"
        })
    }

    if (req.user.role == "Admin") {
        Review.deleteOne({ email: email }).then(() => {
            res.json({
                message: "Review deleted successfully"
            })
        }).catch(() => {
            res.status(500).json({
                message: "Review deletion failed"
            })
        });

        return
    }


    if(req.user.role == "Customer"){

        if(req.user.email == email){
            Review.deleteOne({ email: email }).then(() => {
                res.json({
                    message: "Review deleted successfully"
                })
            }).catch(() => {
                res.status(500).json({
                    message: "Review deletion failed"
                })
            });
        }else{
            res.status(403).json({
                message: "You are not authorized to delete this review"
            });
        }
        
    }

}

export function approvedReview(req,res){
    const email = req.params.email;

    if(req.user == null){
        res.status(401).json({
            message: "Please loging and try again"
        });
    }

    if(req.user.role == "Admin"){
        Review.updateOne(
            { 
                email: email //who
            }, 
            { 
                isApproved: true //what is update
            } 
        ).then(() => {
            res.json({
                message: "Review approved successfully"
            })
        }).catch({
            message: "Review approval failed"
        })
    }else{
        res.status(403).json({
            message: "You are not and admin, only admins can approved the reviews"
        })
    }

}