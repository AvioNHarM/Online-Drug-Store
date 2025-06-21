import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  message: string;
  type?: "error" | "success" | "warning";
  onClose?: () => void;
};

export default function UserMassage({
  message,
  type = "error",
  onClose,
}: Props) {
  const colors = {
    error: "bg-red-100 text-red-700 border-red-300",
    success: "bg-green-100 text-green-700 border-green-300",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-300",
  };

  const icons = {
    error: "❌",
    success: "✅",
    warning: "⚠️",
  };

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`relative w-full px-4 py-3 rounded-md border shadow-sm flex items-center gap-2 ${colors[type]}`}
        >
          <span className="text-lg">{icons[type]}</span>
          <span className="flex-1 text-sm font-medium">{message}</span>
          {onClose && (
            <button
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-gray-700 absolute top-2 right-2"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
