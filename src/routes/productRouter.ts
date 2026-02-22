import { Router } from "express";
import { getProducts, createProduct, deleteProduct, updateProduct } from "../controllers/product.controller";

const productRouter = Router()

// Todas las peticiones que ingresan  
// ProductRouter, empiezan con : 
// http//localhost50000/products/

productRouter.get("/", getProducts)

productRouter.post("/", createProduct)

productRouter.delete("/:id", deleteProduct)

productRouter.patch("/:id", updateProduct)


export { productRouter }