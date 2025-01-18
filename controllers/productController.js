import Product from "../models/product.js";
import { isItAdmin } from "./userController.js";

export async function addProduct(req, res) {
    console.log(req.user) // token

    // product is not created without token beacuse of this code
    if (req.user == null){
        res.status(401).json({ 
            message: "Please login and try again" 
        });
        return
    }

    //check you are admin or not
    if(req.user.role != "Admin"){
        res.status(403).json({
            message: "You are not authorized to perform this action"
        })
    }

    const data = new Product(req.body);
    const newProduct = new Product(data);
    
    //with acync await
    try{
        await newProduct.save();
        res.json({
            message : "Product added Successfully"
        })
    }catch{
        res.status(500).json({
            error: "Product request failer"
        })
    }

    //without acync await
    /*newProduct.save().then(
        () => {
            res.json({
                message: "Product Added Successfully"
            });
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: "Product addition failed"
            })
        }
    )*/
}

export async function getProducts(req,res) { 

    /*let isAdmin = false;

    if(req.user != null){
        if(req.user.role == "Admin"){
            isAdmin = true;
        }
    }*/

    try{

        if(isItAdmin(req)){
            const products = await Product.find();
        res.json(products);
        }else{
            const products = await Product.find({
                avalibility: true
            });
            res.json(products);
            return;
        }
    }catch(e){
        res.status(500).json({
            message: "Failed to get products"
        })
    }
}

export async function updateProduct(req,res) {
    try{
        if(isItAdmin(req)){
            const key = req.params.key;

            const data = req.body;

            await Product.updateOne({
                key: key
            },data)

            res.json({
                message: "Product updated successfully"
            })

            return;

        }else{
            res.status(403).json({
                message: "You are not authorized to perform this action"
            })
        }
    }catch{
        res.status(500).json({
            message: "Product update failed"
        })
    }
}

export async function deleteProduct(req,res) {
    try{
        if(isItAdmin(req)){
            const key = req.params.key;
            await Product.deleteOne({
                key: key
            })
            res.json({
                message: "Product deleted successfully"
            })
        }
    }catch{
        res.status(500).json({
            message: "Failed to delete product"
        })
    }
}