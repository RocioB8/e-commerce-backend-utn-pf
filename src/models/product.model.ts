import { Schema, model, Document } from "mongoose";
import { IProduct } from "../interfaces/IProduct";

const ALLOWED_SIZES = [36, 37, 38, 39, 40, 41, 42];
const ALLOWED_CATEGORIES = ["Running", "Urban", "Training", "Basketball"];

interface IProductDocument extends IProduct, Document { }

const ProductSchema = new Schema<IProductDocument>(
  {
    name: {
      type: String,
      required: [true, "⚠ El nombre es obligatorio"],
      trim: true
    },
    price: {
      type: Number,
      required: [true, "⚠ El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"]
    },

    stock: {
      type: Number,
      default: 0
    },

    description: {
      type: String,
      default: "Sin descripción"
    },
    category: {
      type: String,
      required: [true, "⚠ La categoría es obligatoria"],
      enum: {
        values: ALLOWED_CATEGORIES,
        message: '{VALUE} no es una categoría válida'
      }
    },

    variants: [
      {
        _id: false,
        number: {
          type: Number,
          required: [true, "El talle es obligatorio"],
          enum: {
            values: ALLOWED_SIZES,
            message: 'Talle {VALUE} no permitido (Debe ser 36-42)'
          }
        },
        color: {
          type: String,
          required: [true, "El color es obligatorio"]
        },
        quantity: {
          type: Number,
          required: [true, "La cantidad es obligatoria"],
          min: [0, "La cantidad no puede ser negativa"],
          default: 0
        },
        isAvailable: {
          type: Boolean,
          default: true
        }
      }
    ],

  },
  {
    versionKey: false
  }
);

ProductSchema.pre<IProductDocument>("save", async function () {
  this.stock = this.variants.reduce((acc, v) => acc + v.quantity, 0);
});

const Product = model<IProductDocument>("Product", ProductSchema);
export { Product, IProductDocument }