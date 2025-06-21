"use client";

import Image from "next/image";
import Button from "../../../lib/components/ui/button";
import Navbar from "../../../lib/components/navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CartPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  if (status === "loading" || !session) {
    return (
      <p className="text-center pt-20 text-lg text-gray-600">Loading...</p>
    );
  }

  const cartItems = [
    {
      id: 1,
      name: "Pain Relief Tablets",
      price: 12.99,
      quantity: 2,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDLTeeafLzDab_x1ydpixRfj6aMAILXDhat6OO0Q2sGB9bNZV6N5nP1SxZBGuaqBLOEjQ2ZhD88oI_o6_N9oyh8E9G5wfhZW-F7N2qpVXhrYG8GB9RYqacUeE58pkn2YX2eynGSTtOn1jho5jo1LMHviFiwpuJv_mA0xyzy7tZBDpCUi2jlm-IR32SDuf6rNqZN_jLJYsBg8Ubwjrjtp5gojJb7RjRr6Thhe4ZiYwioqhOHoMFIISPInCcqH_bGeQLG4Hb8hXHfPQOz",
    },
    {
      id: 2,
      name: "Vitamin C Supplements",
      price: 8.49,
      quantity: 1,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCgBt_BcYuYRWyxzw6bw7iPLru-yr6DIy0hNGaidLdNAObVGPf1mKY7aufIiHsKYMat2RhpiFTx3JU8mE7ogd7faWgVqBivME9Wpyu7-EH1Wo5cT-G9vRAOlIb2D5vL8GZeWK-5y2krjt8RCxloUzNrZwfyVit05JCrJfOlSa4bTHiwdLNKOee0ZSY9aH0xsdfb0m-fvPJQ1A6UChRK5shmVqy_wavswbcK3DkvMEsxrmr60LRXbo0YUZXQjp8l_g1rgay8uD6ktKly",
    },
    {
      id: 3,
      name: "Allergy Relief Capsules",
      price: 5.75,
      quantity: 3,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD628UvazX9ppdZ9fkg0XBZZnagP8t-18O0kVxWtEw15IsAIY78dKHI9TCZjHyt2m5lCir1NQtfdfLXXnWC4VdTCP8VBNQ3mbyBGywEbPfGGNkW_rniez-1UzRFHDZ1AhjoegU_PhsN6Fej7UFGdaWVUxh_1I2dEX0_Q4tDpHNn4Vl9ksWzah7oxmxA7MoaFuSvtkVjuUHzM8SrmR6_CCnlNyhWOAun8Wzf5Dd6vVLY69HGKMToTC7AkTGyHV5jeG0UmTpuFSatG_66",
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6">
        {/* Breadcrumbs */}
        <div className="flex gap-2 pb-4">
          <a
            href="#"
            className="text-sm font-medium text-slate-500 hover:text-[var(--brand-red)]"
          >
            Shop
          </a>
          <span className="text-sm font-medium text-slate-500">/</span>
          <span className="text-sm font-medium text-slate-900">Cart</span>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl font-bold text-slate-900 pb-4">Your Cart</h1>

        {/* Cart Items */}
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 hover:bg-slate-50"
            >
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  alt={item.name}
                  src={item.image}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="truncate text-base font-medium text-slate-900">
                  {item.name}
                </h3>
                <p className="text-sm text-slate-500">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300">
                  -
                </button>
                <input
                  type="number"
                  defaultValue={item.quantity}
                  className="text-rose-400 w-8 border-none bg-transparent p-0 text-center font-bold [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  title="Quantity"
                />
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300">
                  +
                </button>
              </div>
              <button
                aria-label="Remove item"
                className="text-slate-500 hover:text-red-600"
              >
                <svg
                  fill="currentColor"
                  height="20px"
                  viewBox="0 0 256 256"
                  width="20px"
                >
                  <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
                </svg>
              </button>
            </div>
          ))}
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
      </div>
    </div>
  );
}
