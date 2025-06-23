export const ErrorPage = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
    <h2 className="text-2xl font-semibold text-red-600 mb-4">
      Error Loading Product
    </h2>
    <p className="text-[var(--text-secondary)] mb-8 max-w-md">{message}</p>
    <button
      onClick={onRetry}
      className="inline-flex items-center px-6 py-3 bg-[var(--primary-color)] text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
    >
      Try Again
    </button>
  </div>
);
