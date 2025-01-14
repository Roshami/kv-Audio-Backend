import Product from "../models/product.js";

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
    if(req.user.role != "admin"){
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