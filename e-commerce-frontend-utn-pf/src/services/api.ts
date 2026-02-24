import type { IProduct } from '../interfaces/Iproduct';

const BASE_URL = import.meta.env.VITE_BASE_API;

interface ApiResponse {
  success: boolean;
  data: IProduct[] | IProduct;
  message?: string;
  count?: number;
  error?: string;
}

const getProducts = async (token: string): Promise<ApiResponse> => {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return await res.json();
};

const createProduct = async (productData: Partial<IProduct>, token: string): Promise<ApiResponse> => {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  });
  return await res.json();
};

const updateProduct = async (productId: string, updates: Partial<IProduct>, token: string): Promise<ApiResponse> => {
  const res = await fetch(`${BASE_URL}/products/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updates)
  });
  return await res.json();
};

const deleteProduct = async (productId: string, token: string): Promise<ApiResponse> => {
  const res = await fetch(`${BASE_URL}/products/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return await res.json();
};

export { getProducts, createProduct, updateProduct, deleteProduct };