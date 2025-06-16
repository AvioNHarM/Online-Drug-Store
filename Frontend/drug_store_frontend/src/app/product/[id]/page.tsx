"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "../../../../lib/components/ui/button";
import Navbar from "../../../../lib/components/navbar";
import Footer from "../../../../lib/components/footer";

type ProductDetail = {
  label: string;
  value: string;
};

const productDetails: ProductDetail[] = [
  { label: "Active Ingredient", value: "Acetaminophen 500mg" },
  {
    label: "Dosage",
    value:
      "Adults: 1-2 tablets every 4-6 hours, not to exceed 8 tablets in 24 hours",
  },
  { label: "Form", value: "Tablets" },
  { label: "Quantity", value: "100 tablets" },
];

// --- The Main Page Component ---

const ProductPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    // The font-family is applied here as in the body tag of the HTML.
    // In a real Next.js app, this is better handled in a root layout file.
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
                    href="#"
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
                    Product
                  </span>
                </li>
              </ol>
            </nav>

            <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
              <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-100 shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1200"
                  alt="Pain Relief Tablets"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h1 className="mb-2 text-3xl font-bold leading-tight tracking-tight">
                  Pain Relief Tablets
                </h1>
                <p className="mb-6 text-base leading-relaxed text-[var(--text-secondary)]">
                  Fast-acting relief for headaches, muscle aches, and fever.
                  Each tablet contains 500mg of acetaminophen.
                </p>

                <section className="mb-6">
                  <h3 className="mb-3 text-xl font-semibold leading-tight tracking-tight">
                    Product Details
                  </h3>
                  <div className="space-y-3">
                    {productDetails.map((detail) => (
                      <div
                        key={detail.label}
                        className="grid grid-cols-[auto_1fr] gap-x-4 border-t border-slate-200 pt-3"
                      >
                        <p className="text-sm font-medium text-[var(--text-secondary)]">
                          {detail.label}:
                        </p>
                        <p className="text-sm text-[var(--text-primary)]">
                          {detail.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="mb-8">
                  <h3 className="mb-3 text-xl font-semibold leading-tight tracking-tight">
                    Warnings
                  </h3>
                  <p className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
                    Do not exceed recommended dosage. Consult a healthcare
                    professional before use if you have liver disease or are
                    taking other medications. Keep out of reach of children.
                  </p>
                </section>

                <div className="flex items-center gap-4">
                  <p className="text-3xl font-bold text-[var(--primary-color)]">
                    $9.99
                  </p>
                  {/* Using the pre-existing Button component with custom classes to match the design */}
                  <Button
                    variant="primary"
                    className="h-12 max-w-[480px] flex-1 px-6 text-base font-bold tracking-[0.015em] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ProductPage;
