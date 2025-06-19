"use client";

import React from "react";
import Navbar from "../../../lib/components/navbar";
import Head from "next/head";

export default function ProductManagementPage() {
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
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6 p-4 bg-[var(--background-card)] rounded-lg shadow">
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                Product Management
              </h1>
              <button className="btn-primary flex items-center gap-2 py-2 px-4 rounded-lg text-sm font-medium shadow-sm">
                <span className="material-icons-outlined text-lg">
                  add_circle_outline
                </span>
                <span className="truncate">Add Product</span>
              </button>
            </div>

            <div className="mb-6 p-4 bg-[var(--bg-light)] rounded-lg shadow">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative md:col-span-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-icons-outlined text-gray-400">
                      search
                    </span>
                  </div>
                  <input
                    type="search"
                    className="form-input pl-10 pr-4 py-2.5 text-sm w-full"
                    placeholder="Search products by name, category..."
                  />
                </div>
                <select
                  className="form-select px-3 py-2.5 text-sm w-full bg-white border border-[var(--border-color)] rounded-md"
                  aria-label="Filter by category"
                >
                  <option defaultValue="">All Categories</option>
                  <option>Pain Relief</option>
                  <option>First Aid</option>
                  <option>Cold &amp; Flu</option>
                  <option>Supplements</option>
                  <option>Skincare</option>
                </select>
                <select
                  className="form-select px-3 py-2.5 text-sm w-full bg-white border border-[var(--border-color)] rounded-md"
                  aria-label="Filter by status"
                >
                  <option defaultValue="">All Statuses</option>
                  <option>Active</option>
                  <option>Unlisted</option>
                </select>
              </div>
            </div>

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
                    <th className="table-header-cell">Product Name</th>
                    <th className="table-header-cell">Category</th>
                    <th className="table-header-cell">Price</th>
                    <th className="table-header-cell">Stock</th>
                    <th className="table-header-cell">Status</th>
                    <th className="table-header-cell text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[var(--border-color)]">
                  {[
                    {
                      name: "Aspirin 500mg",
                      category: "Pain Relief",
                      price: "$5.99",
                      stock: 150,
                      status: "Active",
                    },
                    {
                      name: "Band-Aids (Pack of 20)",
                      category: "First Aid",
                      price: "$3.49",
                      stock: 200,
                      status: "Active",
                    },
                    {
                      name: "Cough Syrup",
                      category: "Cold & Flu",
                      price: "$8.75",
                      stock: 80,
                      status: "Active",
                    },
                    {
                      name: "Multivitamins",
                      category: "Supplements",
                      price: "$12.50",
                      stock: 120,
                      status: "Unlisted",
                    },
                    {
                      name: "Sunscreen SPF 30",
                      category: "Skincare",
                      price: "$10.20",
                      stock: 90,
                      status: "Active",
                    },
                  ].map((product, i) => (
                    <tr key={i}>
                      <td className="table-body-cell px-3 py-4 text-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 rounded"
                          title="Select product"
                        />
                      </td>
                      <td className="table-body-cell font-medium text-[var(--text-primary)]">
                        {product.name}
                      </td>
                      <td className="table-body-cell">{product.category}</td>
                      <td className="table-body-cell">{product.price}</td>
                      <td className="table-body-cell">{product.stock}</td>
                      <td className="table-body-cell">
                        <span
                          className={
                            product.status === "Active"
                              ? "status-active"
                              : "status-unlisted"
                          }
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="table-body-cell text-center space-x-1">
                        <button
                          title="Edit"
                          className="p-1 text-blue-600 hover:text-blue-800 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
                        >
                          <span className="material-icons-outlined text-base">
                            edit
                          </span>
                        </button>
                        <button
                          title={
                            product.status === "Unlisted" ? "List" : "Unlist"
                          }
                          className={`p-1 rounded-md hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                            product.status === "Unlisted"
                              ? "text-green-600 hover:text-green-800 hover:bg-green-100 focus:ring-green-500"
                              : "text-yellow-600 hover:text-yellow-800 hover:bg-yellow-100 focus:ring-yellow-500"
                          }`}
                        >
                          <span className="material-icons-outlined text-base">
                            {product.status === "Unlisted"
                              ? "toggle_on"
                              : "toggle_off"}
                          </span>
                        </button>
                        <button
                          title="Delete"
                          className="p-1 text-red-600 hover:text-red-800 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500"
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

            <div className="mt-6 flex justify-between items-center p-4 bg-[var(--background-card)] rounded-lg shadow">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">5</span> of{" "}
                <span className="font-medium">20</span> results
              </p>
              <div className="flex gap-1">
                <button className="px-3 py-1.5 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--primary-color)]">
                  Previous
                </button>
                <button className="px-3 py-1.5 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--primary-color)]">
                  Next
                </button>
              </div>
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
