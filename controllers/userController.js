import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


export function registerUser(req, res) {

    // witout hashing
    //const newUser = new User(req.body)

    // with hashing
    const data = req.body
    data.password = bcrypt.hashSync(data.password, 10)
    const newUser = new User(data)

    newUser.save().then(() => {
        res.json({
            message: "User registered successfully"
        })
    }
    ).catch((error => {
        res.status(500).json({
            message: "User registaion failer"
        })
    }))
}

export function loginUser(req, res) {

    const data = req.body

    User.findOne({
        email: data.email
    }).then(
        (user) => {
            /*res.json({
                user :user
            })*/


            if (user == null) {
                res.status(400).json({
                    message: "Usr not found"
                });
            } else {
                /*res.json({
                   message: "User found", user
                })*/
                
                //check password is correct or not
                const isPasswordCorrect = bcrypt.compareSync(data.password,user.password);

                if(isPasswordCorrect){
                    const token = jwt.sign({
                        firstName : user.firstName,
                        lastName : user.lastName,
                        email: user.email,
                        role : user.role
                    },process.env.JWT_SECRET) 
                    res.json({
                        message: "Login successfuly",
                        token : token
                    })
                }else{
                    res.json({
                        error : "Login failer"
                    })
                }

            }


        }
    )

}