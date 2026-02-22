import { Product } from "../models/product.model"
import { Request, Response } from "express"
import { productPartialValidate, productValidate, productIdValidate } from "../validators/productValidator"
import { QueryFilter } from "mongoose"
import { IProductDocument } from "../models/product.model"

const getProducts = async (req: Request, res: Response) => {
  try {

    const { category, minPrice, maxPrice, name } = req.query;

    const filter: QueryFilter<IProductDocument> = {};

    if (name) {
      filter.name = { $regex: name as string, $options: "i" };
    }

    if (category) {
      filter.category = category as string;
    }

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    const products = await Product.find(filter).sort({ _id: -1 });

    res.json({
      success: true,
      count: products.length,
      data: products
    });

  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};


const createProduct = async (req: Request, res: Response) => {
  try {

    const validate = productValidate.safeParse(req.body);

    if (!validate.success) {
      return res.status(400).json({
        success: false,
        error: validate.error.flatten().fieldErrors
      });
    }

    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "✅ Producto agregado con éxito",
      data: savedProduct
    });

  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    const validate = productPartialValidate.safeParse(updates);
    if (!validate.success) {
      return res.status(400).json({
        success: false,
        error: validate.error.flatten().fieldErrors
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, error: "❌ No existe el producto para actualizar" });
    }

    Object.assign(product, updates);

    const updatedProduct = await product.save();

    res.json({
      success: true,
      message: "✅ Producto actualizado con éxito",
      data: updatedProduct
    });

  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, error: err.message });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {

    const validation = productIdValidate.safeParse(req.params);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: validation.error.flatten().fieldErrors.id?.[0]
      });
    }
    const { id } = validation.data;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        error: "No existe el producto para borrar"
      });
    }

    res.json({
      success: true,
      message: "✅ Producto eliminado con éxito",
      data: deletedProduct
    });

  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
export {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
}
