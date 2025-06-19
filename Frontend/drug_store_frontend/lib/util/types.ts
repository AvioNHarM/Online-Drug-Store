export type ProductForm = {
  name: string;
  price: string | number; 
  description: string;
  img: string;
  tags: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  img: string | null;
  tags: string[];
  listed: boolean;
  created_at: string;
  updated_at: string;
};
