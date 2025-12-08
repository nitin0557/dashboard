import { Products } from "../types/types";

const API_URL = "https://dummytest.com/";

export const productService = {
  async fetchProducts(): Promise<Products[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },
};
