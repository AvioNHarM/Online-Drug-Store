import { Product, ProductForm } from "../types/product";

const BASE_URL = "http://127.0.0.1:8000/drugstore/products";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id: string | number): Promise<Product> => {
  try {
      const response = await fetch(`${BASE_URL}/get/?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export async function addProduct(product: ProductForm, userid: string) {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("price", product.price.toString());
  formData.append("description", product.description);
  formData.append("tags", product.tags);
  formData.append("userid", userid);
  if (product.img) {
    formData.append("img", product.img);
  }

  const res = await fetch(`${BASE_URL}/add/`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || err.message || "Add product failed");
  }

  return res.json();
}

export async function updateProduct(id: string, product: ProductForm, userid: string) {
  const res = await fetch(`${BASE_URL}/update/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, userid, product }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || err.message || "Update product failed");
  }

  return res.json();
}

export async function toggleListedStatus(id: string, userid: string) {
  const res = await fetch(`${BASE_URL}/unlistNlist/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, userid }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || err.message || "Toggle listed status failed");
  }

  return res.json();
}

export async function deleteProduct(id: string, userid: string) {
  const res = await fetch(`${BASE_URL}/delete/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, userid }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || err.message || "Delete product failed");
  }

  return res.json();
}
