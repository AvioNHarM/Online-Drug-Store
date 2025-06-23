"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../../lib/components/navbar";
import Head from "next/head";

import { useSession } from "next-auth/react";
import { Product, ProductForm } from "../../../lib/types/product";
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  toggleListedStatus,
  updateProduct,
} from "../../../lib/api/product";
import { useRouter } from "next/navigation";
import { isUserAdmin } from "../../../lib/api/auth";
import { LoadingSpinner } from "../../../lib/components/loadingSpinner";

export default function ProductManagementPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<ProductForm>({
    name: "",
    price: "",
    description: "",
    img: "",
    tags: "",
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/auth/login");
      return;
    }

    async function handleAdminCheck() {
      try {
        if (!session || !session.user || !session.user.id) {
          router.push("/auth/login");
          return;
        }

        const isAdmin = await isUserAdmin(session.user.id);

        if (!isAdmin) {
          router.push("/");
          return;
        }

        setIsAdmin(true);
      } catch (error) {
        console.error(error);
        router.push("/");
      }
    }

    handleAdminCheck();
  }, [session, status, router]);

  if (status === "loading" || isAdmin === null) {
    return <LoadingSpinner />;
  }
  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User ID is missing");
  }

  const handleSubmitProduct = async () => {
    try {
      if (editProductId) {
        await updateProduct(editProductId, productForm, userId);
        alert("Product updated successfully");
      } else {
        await addProduct(productForm, userId);
        alert("Product added successfully");
      }
      setShowAddForm(false);
      setEditProductId(null);
      setProductForm({
        name: "",
        price: "",
        description: "",
        img: "",
        tags: "",
      });
      loadProducts();
    } catch (err: any) {
      alert(err.message || "Failed to submit product");
    }
  };

  const startEdit = (product: Product) => {
    setEditProductId(product.id);
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      img: product.img || "",
      tags: product.tags.join(", "),
    });
    setShowAddForm(true);
  };

  const handleToggleListed = async (product: Product) => {
    try {
      await toggleListedStatus(product.id, userId);
      loadProducts();
    } catch (err: any) {
      alert(err.message || "Failed to toggle listed status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id, userId);
      alert("Product deleted successfully");
      loadProducts();
    } catch (err: any) {
      alert(err.message || "Failed to delete product");
    }
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
      </Head>

      <div className="relative flex min-h-screen flex-col bg-[var(--background-card)] text-[var(--text-primary)] overflow-x-hidden">
        <Navbar />
        <main className="px-4 sm:px-6 lg:px-8 flex flex-1 justify-center py-8">
          <div className="layout-content-container flex flex-col w-full max-w-7xl">
            {/* Header and toggle add/edit form button */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6 p-4 bg-[var(--background-card)] rounded-lg shadow">
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                Product Management
              </h1>
              <button
                className="btn-primary flex items-center gap-2 py-2 px-4 rounded-lg text-sm font-medium shadow-sm"
                onClick={() => {
                  setShowAddForm(!showAddForm);
                  setEditProductId(null);
                  setProductForm({
                    name: "",
                    price: "",
                    description: "",
                    img: "",
                    tags: "",
                  });
                }}
              >
                <span className="material-icons-outlined text-lg">
                  {showAddForm ? "close" : "add_circle_outline"}
                </span>
                <span className="truncate">
                  {showAddForm ? "Cancel" : "Add Product"}
                </span>
              </button>
            </div>

            {/* Add/Edit form */}
            {showAddForm && (
              <div className="mb-6 p-4 bg-white rounded-lg shadow animate-fadeIn">
                <h2 className="text-lg font-semibold mb-4">
                  {editProductId ? "Edit Product" : "New Product"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="form-input w-full"
                    value={productForm.name}
                    onChange={(e) =>
                      setProductForm({ ...productForm, name: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    className="form-input w-full"
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm({ ...productForm, price: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    className="form-input w-full"
                    value={productForm.img}
                    onChange={(e) =>
                      setProductForm({ ...productForm, img: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Tags (comma-separated)"
                    className="form-input w-full"
                    value={productForm.tags}
                    onChange={(e) =>
                      setProductForm({ ...productForm, tags: e.target.value })
                    }
                  />
                  <textarea
                    placeholder="Description"
                    className="form-textarea w-full col-span-1 md:col-span-2"
                    value={productForm.description}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mt-4">
                  <button
                    className="btn-primary px-4 py-2 rounded-lg text-sm font-medium"
                    onClick={handleSubmitProduct}
                  >
                    {editProductId ? "Update Product" : "Submit Product"}
                  </button>
                </div>
              </div>
            )}

            {/* Product Table */}
            <div className="bg-[var(--background-card)] shadow-lg rounded-lg overflow-x-auto">
              <table className="min-w-full divide-y divide-[var(--border-color)]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="table-header-cell px-3 py-3 text-center w-12">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 rounded"
                        title="Select product"
                      />
                    </th>
                    <th className="table-header-cell">Name</th>
                    <th className="table-header-cell">Price</th>
                    <th className="table-header-cell">Listed</th>
                    <th className="table-header-cell">Tags</th>
                    <th className="table-header-cell">Created</th>
                    <th className="table-header-cell text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[var(--border-color)]">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="table-body-cell text-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 rounded"
                          title={`${product.name} selection`}
                        />
                      </td>
                      <td className="table-body-cell font-medium">
                        {product.name}
                      </td>
                      <td className="table-body-cell">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="table-body-cell">
                        <span
                          className={
                            product.listed
                              ? "text-green-600"
                              : "text-yellow-600"
                          }
                        >
                          {product.listed ? "Active" : "Unlisted"}
                        </span>
                      </td>
                      <td className="table-body-cell">
                        {product.tags.join(", ")}
                      </td>
                      <td className="table-body-cell">
                        {new Date(product.created_at).toLocaleDateString()}
                      </td>
                      <td className="table-body-cell text-center space-x-1">
                        <button
                          title="Edit"
                          className="p-1 text-blue-600 hover:text-blue-800 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
                          onClick={() => startEdit(product)}
                        >
                          <span className="material-icons-outlined text-base">
                            edit
                          </span>
                        </button>
                        <button
                          title={product.listed ? "Unlist" : "List"}
                          className={`p-1 rounded-md hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                            product.listed
                              ? "text-green-600 hover:text-green-800 hover:bg-green-100 focus:ring-green-500"
                              : "text-yellow-600 hover:text-yellow-800 hover:bg-yellow-100 focus:ring-yellow-500"
                          }`}
                          onClick={() => handleToggleListed(product)}
                        >
                          <span className="material-icons-outlined text-base">
                            {product.listed ? "toggle_on" : "toggle_off"}
                          </span>
                        </button>
                        <button
                          title="Delete"
                          className="p-1 text-red-600 hover:text-red-800 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500"
                          onClick={() => handleDelete(product.id)}
                        >
                          <span className="material-icons-outlined text-base">
                            delete
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
        <footer className="py-6 px-6 md:px-10 border-t border-[var(--border-color)] bg-white">
          <p className="text-center text-sm text-[var(--text-secondary)]">
            © 2023 MediCo. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
