// lib/components/Footer.tsx
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-slate-300 py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              HealthPlus
            </h3>
            <p className="text-sm">
              Your trusted online pharmacy for convenient and reliable
              healthcare.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-[var(--primary-color)] transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/AI"
                  className="hover:text-[var(--primary-color)] transition-colors"
                >
                  AI
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="hover:text-[var(--primary-color)] transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="hover:text-[var(--primary-color)] transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-[var(--primary-color)] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="hover:text-[var(--primary-color)] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>© 2024 HealthPlus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
