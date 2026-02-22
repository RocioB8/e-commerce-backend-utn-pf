interface IVariant {
  color: string;
  number: number;
  quantity: number;
  isAvailable: boolean
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
