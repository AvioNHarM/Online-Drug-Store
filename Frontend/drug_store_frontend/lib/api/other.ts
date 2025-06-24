import { Product } from "../types/product";
import { fetchProducts } from "./product";

// Assuming your API_BASE_URL is defined somewhere accessible
const API_BASE_URL = "http://127.0.0.1:8000/drugstore";


export const searchProducts = async (searchToken: string): Promise<Product[]> => {
  if (!searchToken.trim()) {
    return fetchProducts();
  }

  const response = await fetch(
    `${API_BASE_URL}/products/search/?search_token=${encodeURIComponent(
      searchToken
    )}`
  );

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error("Failed to search for products");
  }

  return response.json();
};
