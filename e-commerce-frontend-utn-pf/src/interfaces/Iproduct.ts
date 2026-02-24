interface IVariant {
  number: number;
  color: string;
  quantity: number;
  isAvailable: boolean;
}

type Category = "Running" | "Urban" | "Training" | "Basketball";

interface IProduct {
  _id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  category: Category
  variants: IVariant[];
}

export type { IProduct, IVariant, Category };