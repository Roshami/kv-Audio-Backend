import express from "express"
import { addProduct, deleteProduct, getProduct, getProducts, searchAndFilterProduct, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/",addProduct);
productRouter.get("/", getProducts);
productRouter.put("/:key",updateProduct);
productRouter.delete("/:key",deleteProduct);
productRouter.get("/:key",getProduct);
productRouter.get("/filterProducts",searchAndFilterProduct);

export default productRouter;