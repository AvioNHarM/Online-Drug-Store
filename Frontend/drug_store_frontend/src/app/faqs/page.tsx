"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../../lib/components/navbar";
import Footer from "../../../lib/components/footer";

const questions = [
  {
    question: "How do I place an order?",
    answer:
      "You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. Follow the on-screen instructions to complete your purchase.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and other secure online payment methods.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Shipping times vary depending on your location and the shipping method selected. Standard shipping typically takes 3-5 business days.",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Yes, we have a return and exchange policy. Please refer to our Returns & Exchanges page for detailed information on eligibility and procedures.",
  },
  {
    question: "Do you offer prescription refills?",
    answer:
      "Yes, we offer prescription refill services. You can manage your prescriptions and request refills through your online account or by contacting our pharmacy team.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can contact our customer support team via phone, email, or live chat. Visit our Contact Us page for more details and operating hours.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 text-[var(--text-primary)] font-[Lexend,_\'Noto_Sans\',sans-serif]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 md:px-10 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-lg text-[var(--text-secondary)]">
            Find answers to common questions about our services, products, and
            policies.
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((q, index) => (
            <div
              key={index}
              className={`rounded-xl border border-[var(--border-color)] bg-white shadow-sm transition-all duration-300 hover:border-[var(--primary-color)]`}
            >
              <button
                onClick={() => setOpenIndex(index === openIndex ? null : index)}
                className="w-full flex items-center justify-between p-5 cursor-pointer group"
              >
                <h3 className="text-base font-medium group-hover:text-[var(--primary-color)] transition-colors">
                  {q.question}
                </h3>
                <motion.div
                  animate={{ rotate: index === openIndex ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[var(--text-secondary)] group-hover:fill-[var(--primary-color)]"
                >
                  <svg
                    fill="currentColor"
                    height="20px"
                    width="20px"
                    viewBox="0 0 256 256"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence initial={false} mode="wait">
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, scaleY: 0.95 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="origin-top px-5 pb-5 pt-2 text-sm text-[var(--text-secondary)]"
                    style={{ overflow: "hidden" }}
                  >
                    {q.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
