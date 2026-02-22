interface IVariant {
  color: string;
  size: number;
  stock: number;
  quantity: number;
}


interface IProduct {
  name: string;
  price: number;
  description: string;
  category: string;
  variants: IVariant[];
  stock: number;
}

export { IProduct, IVariant }
