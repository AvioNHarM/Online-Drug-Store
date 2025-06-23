import { CartItem } from "../types/cart";
import { fetchProductById } from "./product";

export interface AddToCartRequest {
  userid: string;
  product_id: string;
  quantity: number;
}

const API_BASE_URL = "http://127.0.0.1:8000/drugstore/cart";

export async function addToCart(data: AddToCartRequest): Promise<{ message: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/add/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: data.userid,
        product_id: data.product_id,
        quantity: data.quantity,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
}

export async function fetchCartItems(userId: string): Promise<CartItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/list/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid: userId }),
    });
    
    if (!res.ok) throw new Error("Failed to fetch cart items");
    
    const data = await res.json();
    const cartItems = data.cart || [];
    
    const itemsWithDetails = await Promise.all(
      cartItems.map(async (item: CartItem) => {
        try {
          const product = await fetchProductById(item.product_id);
          return {
            ...item,
            name: product.name,
            price: product.price,
            image: product.img || null,
          };
        } catch (error) {
          console.error(`Error fetching product details for ${item.product_id}:`, error);
          return {
            ...item,
            name: `Product ${item.product_id}`,
            price: 0,
            image: null,
          };
        }
      })
    );
    
    return itemsWithDetails;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
}

export async function updateCartQuantity(userId: string, productId: string | number, quantity: number) {
  try {
    const res = await fetch(`${API_BASE_URL}/update_quantity/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        userid: userId, 
        product_id: productId.toString(),
        quantity: quantity
      }),
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to update quantity: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    throw error;
  }
}

export async function removeFromCart(userId: string, productId: string | number) {
  try {
    const res = await fetch(`${API_BASE_URL}/remove/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        userid: userId, 
        product_id: productId.toString()
      }),
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to remove item: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
}