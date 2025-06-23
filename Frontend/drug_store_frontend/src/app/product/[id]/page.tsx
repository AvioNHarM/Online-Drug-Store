"use client";

import { useEffect, useState, useRef, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../../../../lib/types/product";

import { fetchProductById } from "../../../../lib/api/product";
import Navbar from "../../../../lib/components/navbar";
import { LoadingSpinner } from "../../../../lib/components/loadingSpinner";
import { NotFoundPage } from "../../../../lib/components/404Page";
import { ErrorPage } from "../../../../lib/components/errorPage";
import Button from "../../../../lib/components/ui/button";
import Footer from "../../../../lib/components/footer";
import { addToCart } from "../../../../lib/api/cart";
import { safeAddToHistory } from "../../../../lib/api/history";

import { useSession } from "next-auth/react";

const ProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data: session } = useSession();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  // Ref to track if history has been added for this product view
  const historyAddedRef = useRef(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      setNotFound(false);
      // Reset history tracking when fetching new product
      historyAddedRef.current = false;

      const productData = await fetchProductById(id);

      // Check if product is listed/active
      if (!productData.listed) {
        setNotFound(true);
      } else {
        setProduct(productData);
      }
    } catch (err: any) {
      console.error("Error fetching product:", err);

      // Check if it's a 404 error
      if (
        err.message?.includes("404") ||
        err.message?.includes("status: 404")
      ) {
        setNotFound(true);
      } else {
        setError(err.message || "An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

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
    }
  };

  // Effect to add product to history when user views it
  useEffect(() => {
    if (
      product &&
      session?.user?.id &&
      !historyAddedRef.current &&
      !loading &&
      !error &&
      !notFound
    ) {
      // Add to history and mark as added
      safeAddToHistory(session.user.id, product.id);
      historyAddedRef.current = true;
    }
  }, [product, session?.user?.id, loading, error, notFound]);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-slate-50 text-[var(--text-primary)]"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <div className="flex h-full grow flex-col">
        <Navbar />

        <main className="flex-1 py-8 px-10 md:px-20 lg:px-40">
          <link
            href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;700;900&family=Noto+Sans:wght@400;500;700;900&display=swap"
            rel="stylesheet"
          />
          <div className="mx-auto flex max-w-5xl flex-col">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-sm">
                <li>
                  <Link
                    href="/shop"
                    className="font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--primary-color)]"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <span className="text-[var(--text-secondary)]">/</span>
                </li>
                <li>
                  <span className="font-medium text-[var(--text-primary)]">
                    {loading ? "Loading..." : product?.name || "Product"}
                  </span>
                </li>
              </ol>
            </nav>

            {loading && <LoadingSpinner />}

            {notFound && <NotFoundPage />}

            {error && <ErrorPage message={error} onRetry={fetchProduct} />}

            {product && !loading && !error && !notFound && (
              <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-100 shadow-lg">
                  <Image
                    src={
                      product.img?.startsWith("http")
                        ? product.img
                        : product.img
                        ? `/${product.img}`
                        : "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1200"
                    }
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h1 className="mb-2 text-3xl font-bold leading-tight tracking-tight">
                    {product.name}
                  </h1>
                  <p className="mb-6 text-base leading-relaxed text-[var(--text-secondary)]">
                    {product.description}
                  </p>

                  {product.tags.length > 0 && (
                    <section className="mb-6">
                      <h3 className="mb-3 text-xl font-semibold leading-tight tracking-tight">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  <section className="mb-6">
                    <h3 className="mb-3 text-xl font-semibold leading-tight tracking-tight">
                      Product Details
                    </h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-[auto_1fr] gap-x-4 border-t border-slate-200 pt-3">
                        <p className="text-sm font-medium text-[var(--text-secondary)]">
                          Product ID:
                        </p>
                        <p className="text-sm text-[var(--text-primary)]">
                          {product.id}
                        </p>
                      </div>
                      <div className="grid grid-cols-[auto_1fr] gap-x-4 border-t border-slate-200 pt-3">
                        <p className="text-sm font-medium text-[var(--text-secondary)]">
                          Status:
                        </p>
                        <p className="text-sm text-[var(--text-primary)]">
                          {product.listed ? "Available" : "Unavailable"}
                        </p>
                      </div>
                      <div className="grid grid-cols-[auto_1fr] gap-x-4 border-t border-slate-200 pt-3">
                        <p className="text-sm font-medium text-[var(--text-secondary)]">
                          Added:
                        </p>
                        <p className="text-sm text-[var(--text-primary)]">
                          {formatDate(product.created_at)}
                        </p>
                      </div>
                      <div className="grid grid-cols-[auto_1fr] gap-x-4 border-t border-slate-200 pt-3">
                        <p className="text-sm font-medium text-[var(--text-secondary)]">
                          Last Updated:
                        </p>
                        <p className="text-sm text-[var(--text-primary)]">
                          {formatDate(product.updated_at)}
                        </p>
                      </div>
                    </div>
                  </section>

                  <div className="flex items-center gap-4">
                    <p className="text-3xl font-bold text-[var(--primary-color)]">
                      ${product.price.toFixed(2)}
                    </p>
                    <Button
                      variant="primary"
                      className="h-12 max-w-[480px] flex-1 px-6 text-base font-bold tracking-[0.015em] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50"
                      onClick={(e) => {
                        handleAddToCart(product.id, e);
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ProductPage;
