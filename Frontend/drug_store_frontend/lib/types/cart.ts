export interface CartItem {
  id: number;
  product_id: string;
  quantity: number;
  // These will be populated from fetchProductById
  name?: string;
  price?: number;
  image?: string;
}