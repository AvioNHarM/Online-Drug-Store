import { AddToHistoryParams, AddToHistoryResponse, HistoryAPIResponse } from "../types/history";
import { Product } from "../types/product";
import { fetchProductById } from "./product";

const API_BASE_URL = "http://127.0.0.1:8000/drugstore/history";


export const fetchHistoryIds = async (userId: string): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/list/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid: userId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data: HistoryAPIResponse = await response.json();
    
    return data.history.map(item => item.product_id);

  } catch (error) {
    console.error("Error fetching user history:", error);
    return [];
  }
};


export const fetchHistoryProducts = async (productIds: string[]): Promise<Product[]> => {
    if (productIds.length === 0) return [];
    
    try {
        const productPromises = productIds.map(id => fetchProductById(id));
        const products = await Promise.all(productPromises);
        return products.filter(p => p);
    } catch (error) {
        console.error("Error fetching product details for history:", error);
        return [];
    }
}

export const addToHistory = async (params: AddToHistoryParams): Promise<AddToHistoryResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/add/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding to history:', error);
    throw error;
  }
};

export const safeAddToHistory = async (userid: string, productId: string): Promise<void> => {
  try {
    await addToHistory({ userid, product_id: productId });
  } catch (error) {
    console.warn('Failed to add product to history:', error);
  }
};