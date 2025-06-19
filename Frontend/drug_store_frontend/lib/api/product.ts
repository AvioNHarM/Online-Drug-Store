import { Product, ProductForm } from "../util/types";

const BASE_URL = "http://127.0.0.1:8000/drugstore/products";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function addProduct(product: ProductForm) {
  const res = await fetch(`${BASE_URL}/add/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || err.message || "Add product failed");
  }
  return res.json();
}

export async function updateProduct(id: string, product: ProductForm) {
  const res = await fetch(`${BASE_URL}/update/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, product }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || err.message || "Update product failed");
  }
  return res.json();
}

export async function toggleListedStatus(id: string) {
  const res = await fetch(`${BASE_URL}/unlistNlist/?id=${id}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || err.message || "Toggle listed status failed");
  }
  return res.json();
}

export async function deleteProduct(id: string) {
  const res = await fetch(`${BASE_URL}/delete/?id=${id}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || err.message || "Delete product failed");
  }
  return res.json();
}