"use client";

import Head from "next/head";
import React from "react";
import Button from "../../../lib/components/ui/button";
import Navbar from "../../../lib/components/navbar";
import Footer from "../../../lib/components/footer";

export default function CartPage() {
  // Dummy product data for demonstration
  const products = [
    {
      id: 1,
      name: "Pain Relief",
      description: "Paracetamol 500mg",
      price: "5.99",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBHneinjJca63_38L-H5XcXqrU9P8JlY7pws59kR4AyT059L6W8egXi16UhGgFwTSZLzkOUrt6V8Ng5q9W_zxdhJ8txasGt1lWjnCi7xEIDixbEv3ak7LXOkBVB-QfjpayI3I0RHPsPYoXOjgXisC5BAt8ld6SC8lJM9um_YV5MupWT2p8R8a3NYegagPE8VgSN_MKE5nztdB7swflgaZNdOE1xI9MJjDX3lH0VfWUXd5ZN2ZrlCp0AmhndhWYZyH2i2sB6tiEawN96",
    },
    {
      id: 2,
      name: "Allergy & Sinus",
      description: "Cetirizine Tablets",
      price: "12.49",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD-gdvPLgri_Ar2H4zwuPDS42-0JmNYs2jkPglGQaDsVqYbyUAOYojtStvcyNS3KiDs3HDCpNdEQr1Tr2wnHw1Hs4zlzxdl18loT_lKdckbmRRqaD8SuNZjtflriTea_tn4AM6Awd99d8_Naw82tDBrxiSUG0BPC_7mW0dCxgNv0ASw16bcxm1AnXBqVzIosPQ-0Bu2EBDJmYEdff8GeLEcFit_-LjFlyEtEInzliYxRGdnMeGwMIKBQClgG_bRoPhb7jtYYzvRRbhj",
    },
    {
      id: 3,
      name: "Cold & Flu",
      description: "Relief Syrup",
      price: "8.99",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD02bhwAc-X5KZc1dXan_6ut27trJQbEpxp01vnF1UBGz7CjsbfxikNn8GYXLHkzUdzs8_BRVC4OiOjbgm9cQCPKuS78GyU4wrNtCrMG_JzRJ7Qxa2EYFCiLARwgrqoVDRtiu0bESJ5kInB7uwZqzf2HHtrYY0oGQLUkbsc-NE1wJjD4f1OZR_SFiMHeEMloVMWoPUOcE7uAHkc21pGu5CFMsl1lkHMI2XvD88sVKnbPLMWEvxxHgr797phPjlJ2pv1T5_tRxrlPdYV",
    },
    {
      id: 4,
      name: "Digestive Health",
      description: "Probiotic Capsules",
      price: "15.00",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBZJQio-sfZ6qz5_n9R-eTTuvrj07_DQgZbVS9fOir1j-VF0wqxzSjIsTB2mNSPgIrNVPp1bnnBH4dOF9AEwIS956Czc3u4BjcCo14DjbcpqGhXIvHY5BhPE32EW60cYfTZVPWn_ooUJ0CfJoisq6fgJKEsDBX_bYyM3-7pH0Yv2o9UVxeughONIMueJoMJLDmaHx2Y12wxbnnAqRqh6_Qo3fkyA43O22NjyfqIalDRWd0vnl1YSEJBpL53hlG6cXPP8WZzVi0XgJKH",
    },
    {
      id: 5,
      name: "First Aid",
      description: "Bandages & Antiseptics",
      price: "7.25",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDgbJJiZ18Hz-vUC4b-Y7Am2xkTZn5wPZDjxY13i4Rw2TWld7D9ZPzmBaPfYecS4dckOI-w3Zc18DiogDZP5KRwM8mTl26eM1QsrX28ZJED99ZUG7MhIxJmkPEBDqItnNwuV-xQCehENTTu0SWXE5Fv_dp8RGh0dimOXfYvKSkeGVn8cs7a3ZqT_rpaokGVKMhiBIqo149riZhPAJsENguEXMg4DAEKQLzM7CGDBq75wyQOy9Z94jiji2KgSeHZKtNsdQzd8YJ96Shl",
    },
  ];

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com/"
          crossOrigin=""
        />
        <link
          as="style"
          href="https://fonts.googleapis.com/css2?display=swap&family=Lexend%3Awght%40400%3B500%3B700%3B900&family=Noto+Sans%3Awght%40400%3B500%3B700%3B900"
          onLoad={(e) => {
            (e.currentTarget as HTMLLinkElement).rel = "stylesheet";
          }}
          rel="stylesheet"
        />
        <title>HealthPlus Pharmacy</title>
        <link href="data:image/x-icon;base64," rel="icon" type="image/x-icon" />
        {/* Tailwind CSS is typically set up in global.css, but for this direct translation, we'll keep the script here */}
      </Head>

      <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col  bg-slate-50">
          <Navbar />

          <main className="px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-8 bg-gray-50">
            <div className="layout-content-container flex flex-col max-w-7xl flex-1">
              <div className="px-4 py-6">
                <label className="flex flex-col min-w-40 h-14 w-full">
                  <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm border border-transparent focus-within:border-[var(--primary-color)] focus-within:ring-2 focus-within:ring-[var(--primary-color)] focus-within:ring-opacity-50 transition-all">
                    <div className="text-[var(--text-secondary)] flex bg-white items-center justify-center pl-5 rounded-l-xl">
                      <svg
                        fill="currentColor"
                        height="24px"
                        viewBox="0 0 256 256"
                        width="24px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                      </svg>
                    </div>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl text-[var(--text-primary)] focus:outline-none focus:ring-0 border-none bg-white h-full placeholder:text-[var(--text-secondary)] px-4 text-base font-normal leading-normal"
                      placeholder="Search for products or health concerns"
                      value=""
                    />
                  </div>
                </label>
              </div>
              <div className="flex gap-3 p-4 flex-wrap items-center">
                <span className="text-[var(--text-secondary)] text-sm font-medium mr-2">
                  Filter by:
                </span>
                <Button
                  variant="secondary"
                  className="filter-chip flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-200 px-4 text-[var(--text-primary)] text-sm font-medium leading-normal transition-colors active"
                >
                  All
                </Button>
                <Button
                  variant="secondary"
                  className="filter-chip flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-200 px-4 text-[var(--text-primary)] text-sm font-medium leading-normal transition-colors"
                >
                  Prescription
                </Button>
                <Button
                  variant="secondary"
                  className="filter-chip flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-200 px-4 text-[var(--text-primary)] text-sm font-medium leading-normal transition-colors"
                >
                  Vitamins
                </Button>
                <Button
                  variant="secondary"
                  className="filter-chip flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-200 px-4 text-[var(--text-primary)] text-sm font-medium leading-normal transition-colors"
                >
                  Personal Care
                </Button>
                <Button
                  variant="secondary"
                  className="filter-chip flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-200 px-4 text-[var(--text-primary)] text-sm font-medium leading-normal transition-colors"
                >
                  Home Health Care
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="product-card flex flex-col gap-3 pb-3 rounded-xl shadow-lg bg-white overflow-hidden transition-shadow hover:shadow-xl group cursor-pointer"
                  >
                    <div className="relative w-full aspect-square overflow-hidden">
                      <div
                        className="product-image w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-300 ease-in-out"
                        style={{ backgroundImage: `url("${product.image}")` }}
                      ></div>
                      <Button
                        onClick={() =>
                          console.log(`Add ${product.name} to cart`)
                        }
                        className="add-to-cart-button absolute bottom-3 right-3 flex items-center justify-center size-10 rounded-full bg-[var(--primary-color)] text-white shadow-md hover:bg-opacity-80 transition-all"
                      >
                        <svg
                          fill="currentColor"
                          height="20px"
                          viewBox="0 0 256 256"
                          width="20px"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M216,48H40a8,8,0,0,0-8,8V176a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V56A8,8,0,0,0,216,48ZM48,64H208V88H48Zm160,112H48V104H208v72Zm-40-88a8,8,0,0,1-8,8H128a8,8,0,0,1,0-16h32A8,8,0,0,1,168,88Z"></path>
                        </svg>
                      </Button>
                    </div>
                    <div className="p-3">
                      <p className="product-name text-[var(--text-primary)] text-base font-semibold leading-normal truncate transition-colors">
                        {product.name}
                      </p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {product.description}
                      </p>
                      <p className="text-lg font-bold text-[var(--primary-color)] mt-1">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
