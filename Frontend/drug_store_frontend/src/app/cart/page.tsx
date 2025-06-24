"use client";

import Image from "next/image";
import Button from "../../../lib/components/ui/button";
import Navbar from "../../../lib/components/navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../../lib/components/loadingSpinner";
import {
  fetchCartItems,
  updateCartQuantity,
  removeFromCart,
} from "../../../lib/api/cart";
import { CartItem } from "../../../lib/types/cart";
import Link from "next/link";
import { Product } from "../../../lib/types/product";
import {
  fetchHistoryIds,
  fetchHistoryProducts,
} from "../../../lib/api/history";

export default function CartPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [historyItems, setHistoryItems] = useState<Product[]>([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/auth/login");
    } else {
      fetchCartItems(session.user.id)
        .then(setCartItems)
        .finally(() => setLoadingCart(false));

      fetchHistoryIds(session.user.id)
        .then(fetchHistoryProducts)
        .then(setHistoryItems)
        .finally(() => setLoadingHistory(false));
    }
  }, [session, status, router]);

  if (status === "loading" || !session || loadingCart) {
    return (
      <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col bg-slate-50">
          <main className="px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-8 bg-gray-50">
            <div className="flex items-center justify-center">
              <LoadingSpinner />
            </div>
          </main>
        </div>
      </div>
    );
  }

  const handleQuantityChange = async (
    productId: string | number,
    quantity: number
  ) => {
    if (quantity <= 0) return;

    try {
      await updateCartQuantity(session.user.id, productId, quantity);
      setCartItems((prev) =>
        prev.map((item) =>
          item.product_id === productId.toString()
            ? { ...item, quantity }
            : item
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
      // You might want to show a toast/notification here
    }
  };

  const handleInputChange = (productId: string | number, value: string) => {
    const quantity = parseInt(value);
    if (isNaN(quantity) || quantity <= 0) return;
    handleQuantityChange(productId, quantity);
  };

  const handleRemove = async (productId: string | number) => {
    try {
      await removeFromCart(session.user.id, productId);
      setCartItems((prev) =>
        prev.filter((item) => item.product_id !== productId.toString())
      );
    } catch (err) {
      console.error("Error removing item:", err);
      // You might want to show a toast/notification here
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6">
        <div className="flex gap-2 pb-4">
          <a
            href="/gallery"
            className="text-sm font-medium text-slate-500 hover:text-[var(--brand-red)]"
          >
            Shop
          </a>
          <span className="text-sm font-medium text-slate-500">/</span>
          <span className="text-sm font-medium text-slate-900">Cart</span>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl font-bold text-slate-900 pb-4">Your Cart</h1>
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {cartItems.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <p>Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={`${item.product_id}-${item.id}`}
                className="flex items-center gap-4 p-4 hover:bg-slate-50"
              >
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100 flex items-center justify-center">
                  {item.image ? (
                    <Image
                      alt={item.name || "Product"}
                      src={item.image}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="flex items-center justify-center h-full w-full text-slate-400">
                              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                              </svg>
                            </div>
                          `;
                        }
                      }}
                      unoptimized={process.env.NODE_ENV === "development"}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full text-slate-400">
                      <svg
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="truncate text-base font-medium text-slate-900">
                    {item.name || `Product ${item.product_id}`}
                  </h3>
                  <p className="text-sm text-slate-500">
                    ${(item.price || 0).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() =>
                      handleQuantityChange(item.product_id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleInputChange(item.product_id, e.target.value)
                    }
                    className="w-16 h-8 border border-slate-300 rounded-md px-2 text-center font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    title="Quantity"
                  />
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
                    onClick={() =>
                      handleQuantityChange(item.product_id, item.quantity + 1)
                    }
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  className="p-2 text-slate-500 hover:text-red-600 transition-colors rounded-md hover:bg-red-50"
                  onClick={() => handleRemove(item.product_id)}
                  aria-label="Remove item"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 3V4H4V6H5V19A2 2 0 007 21H17A2 2 0 0019 19V6H20V4H15V3H9ZM7 6H17V19H7V6ZM9 8V17H11V8H9ZM13 8V17H15V8H13Z" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="mt-6">
          <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>
          <div className="space-y-3 py-4 border-b border-slate-200">
            <div className="flex justify-between">
              <p className="text-sm text-slate-500">Subtotal</p>
              <p className="text-sm font-medium text-slate-900">
                ${subtotal.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-slate-500">Shipping</p>
              <p className="text-sm font-medium text-slate-900">Free</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-slate-500">Estimated Tax</p>
              <p className="text-sm font-medium text-slate-900">
                ${tax.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex justify-between py-4">
            <p className="font-bold text-slate-900">Total</p>
            <p className="text-lg font-bold text-slate-900">
              ${total.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="mt-4">
          <Button size="large" className="w-full sm:w-auto">
            Proceed to Checkout
          </Button>
        </div>

        {/* --- NEW: Browse History Section --- */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-slate-900">
            Your Browse History
          </h2>
          {loadingHistory ? (
            <div className="flex justify-center items-center h-48">
              <LoadingSpinner />
            </div>
          ) : historyItems.length > 0 ? (
            <div className="mt-4">
              <div className="flex gap-4 overflow-x-auto pb-4">
                {historyItems.map((item) => (
                  <Link
                    href={`/product/${item.id}`}
                    key={item.id}
                    className="block flex-shrink-0 w-48"
                  >
                    <div className="group rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden h-full">
                      <div className="relative h-40 w-full bg-slate-100">
                        {item.img ? (
                          <Image
                            alt={item.name}
                            src={item.img}
                            fill={true}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "cover" }}
                            className="group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full text-slate-400">
                            <svg
                              width="32"
                              height="32"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="truncate text-sm font-medium text-slate-800 group-hover:text-[var(--brand-red)]">
                          {item.name}
                        </h3>
                        <p className="text-sm font-semibold text-slate-900 mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 mt-4 border border-dashed rounded-lg">
              <p>You have not viewed any products yet. Keep shopping!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
