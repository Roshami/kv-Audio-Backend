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

    let isAdmin = false;

    if(req.user != null){
        if(req.user.role == "Admin"){
            isAdmin = true;
        }
    }

    try{

        if(isAdmin){
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