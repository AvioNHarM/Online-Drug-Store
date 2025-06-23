import Link from "next/link";

export const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
    <h1 className="text-6xl font-bold text-[var(--text-secondary)] mb-4">
      404
    </h1>
    <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
      Product Not Found
    </h2>
    <p className="text-[var(--text-secondary)] mb-8 max-w-md">
      The product you're looking for doesn't exist or may have been removed.
    </p>
    <Link
      href="/"
      className="inline-flex items-center px-6 py-3 bg-[var(--primary-color)] text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
    >
      Back to Shop
    </Link>
  </div>
);
