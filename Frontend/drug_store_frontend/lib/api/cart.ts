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