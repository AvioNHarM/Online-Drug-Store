"use client";

import Head from "next/head";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Button from "../../../lib/components/ui/button";
import Navbar from "../../../lib/components/navbar";
import Footer from "../../../lib/components/footer";
import { Product } from "../../../lib/types/product";
import { fetchProducts } from "../../../lib/api/product";
import { addToCart } from "../../../lib/api/cart";

export default function GalleryPage() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  // Fetch products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Handle add to cart
  const handleAddToCart = async (
    productId: string,
    event: React.MouseEvent
  ) => {
    event.preventDefault(); // Prevent navigation to product page
    event.stopPropagation();

    if (!session?.user?.id) {
      alert("Please log in to add items to cart");
      return;
    }

    try {
      setAddingToCart(productId);
      await addToCart({
        userid: session.user.id,
        product_id: productId,
        quantity: 1,
      });

      // Show success message (you might want to use a proper toast notification)
      alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart. Please try again.");
    } finally {
      setAddingToCart(null);
    }
  };

  // Filter products based on search query and active filter
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === "All") return matchesSearch;

    // Filter by tags if they exist
    return (
      matchesSearch &&
      product.tags &&
      product.tags.includes(activeFilter.toLowerCase())
    );
  });

  if (loading) {
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <title>HealthPlus Pharmacy</title>
        </Head>
        <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
          <div className="layout-container flex h-full grow flex-col bg-slate-50">
            <Navbar />
            <main className="px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-8 bg-gray-50">
              <div className="flex items-center justify-center">
                <div className="text-lg">Loading products...</div>
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <title>HealthPlus Pharmacy</title>
        </Head>
        <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
          <div className="layout-container flex h-full grow flex-col bg-slate-50">
            <Navbar />
            <main className="px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-8 bg-gray-50">
              <div className="flex items-center justify-center">
                <div className="text-lg text-red-600">
                  Error loading products: {error}
                </div>
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </>
    );
  }

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
      </Head>

      <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col bg-slate-50">
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
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </label>
              </div>

              <div className="flex gap-3 p-4 flex-wrap items-center">
                <span className="text-[var(--text-secondary)] text-sm font-medium mr-2">
                  Filter by:
                </span>
                {[
                  "All",
                  "Prescription",
                  "Vitamins",
                  "Personal Care",
                  "Home Health Care",
                ].map((filter) => (
                  <Button
                    key={filter}
                    variant="secondary"
                    onClick={() => setActiveFilter(filter)}
                    className={`filter-chip flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 text-sm font-medium leading-normal transition-colors ${
                      activeFilter === filter
                        ? "bg-[var(--primary-color)] text-white"
                        : "bg-slate-200 text-[var(--text-primary)]"
                    }`}
                  >
                    {filter}
                  </Button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
                {filteredProducts.length === 0 ? (
                  <div className="col-span-full text-center py-8">
                    <p className="text-[var(--text-secondary)] text-lg">
                      {searchQuery || activeFilter !== "All"
                        ? "No products found matching your criteria."
                        : "No products available."}
                    </p>
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <div key={product.id} className="block h-full relative">
                      <Link
                        href={`/product/${product.id}`}
                        className="block h-full"
                      >
                        <div className="product-card flex flex-col h-full rounded-xl shadow-lg bg-white overflow-hidden transition-all hover:shadow-xl hover:scale-105 group cursor-pointer">
                          {/* Fixed height image container */}
                          <div className="relative w-full h-48 overflow-hidden flex-shrink-0">
                            {product.img ? (
                              <div
                                className="product-image w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                                style={{
                                  backgroundImage: `url("${product.img}")`,
                                }}
                              ></div>
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center group-hover:from-blue-100 group-hover:to-indigo-200 transition-all duration-300">
                                <div className="w-16 h-16 mb-3 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                                  <svg
                                    className="w-8 h-8 text-indigo-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                    />
                                  </svg>
                                </div>
                                <div className="text-center">
                                  <p className="text-sm font-medium text-indigo-600 mb-1">
                                    Health Care Product
                                  </p>
                                  <p className="text-xs text-indigo-400">
                                    Image coming soon
                                  </p>
                                </div>
                              </div>
                            )}
                            {session && (
                              <div className="absolute bottom-4 right-4">
                                <Button
                                  onClick={(e) =>
                                    handleAddToCart(product.id, e)
                                  }
                                  disabled={addingToCart === product.id}
                                  className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white px-3 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 text-sm font-medium"
                                >
                                  {addingToCart === product.id ? (
                                    <>
                                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                      Adding...
                                    </>
                                  ) : (
                                    <svg
                                      fill="currentColor"
                                      height="16px"
                                      viewBox="0 0 256 256"
                                      width="16px"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M216,48H40a8,8,0,0,0-8,8V176a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V56A8,8,0,0,0,216,48ZM48,64H208V88H48Zm160,112H48V104H208v72Zm-40-88a8,8,0,0,1-8,8H128a8,8,0,0,1,0-16h32A8,8,0,0,1,168,88Z"></path>
                                    </svg>
                                  )}
                                </Button>
                              </div>
                            )}
                          </div>

                          {/* Fixed height content container */}
                          <div className="flex flex-col flex-grow p-4 min-h-[140px]">
                            <div className="flex-grow">
                              <h3 className="product-name text-[var(--text-primary)] text-base font-semibold leading-tight mb-2 line-clamp-2">
                                {product.name}
                              </h3>
                              <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3">
                                {product.description}
                              </p>
                            </div>

                            {/* Add to Cart Button - Only show if user is logged in */}
                            {/* Price and tags at bottom */}
                            <div className="mt-auto">
                              <p className="text-lg font-bold text-[var(--primary-color)] mb-2">
                                $
                                {typeof product.price === "number"
                                  ? product.price.toFixed(2)
                                  : product.price}
                              </p>

                              {product.tags && product.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {product.tags
                                    .slice(0, 2)
                                    .map((tag, index) => (
                                      <span
                                        key={index}
                                        className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-full truncate"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  {product.tags.length > 2 && (
                                    <span className="px-2 py-1 text-xs bg-slate-100 text-slate-400 rounded-full">
                                      +{product.tags.length - 2}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
