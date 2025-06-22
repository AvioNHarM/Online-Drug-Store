"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Button from "./ui/button";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-gray-100/90 backdrop-blur-md shadow-sm flex items-center justify-between whitespace-nowrap px-6 md:px-10 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <svg
              className="text-[var(--primary-color)]"
              fill="currentColor"
              height="36"
              viewBox="0 0 24 24"
              width="36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
              <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7z"></path>
            </svg>
            <h2 className="text-[var(--secondary-color)] text-2xl font-bold leading-tight tracking-tight">
              HealthPlus
            </h2>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/gallery"
            className="px-5 py-2.5 rounded-full text-gray-700 hover:text-gray-900 hover:bg-white/80 text-sm font-medium leading-normal transition-all duration-300 ease-in-out hover:shadow-sm border border-transparent hover:border-gray-200/50"
          >
            Shop
          </Link>
          <Link
            href="#services"
            className="px-5 py-2.5 rounded-full text-gray-700 hover:text-gray-900 hover:bg-white/80 text-sm font-medium leading-normal transition-all duration-300 ease-in-out hover:shadow-sm border border-transparent hover:border-gray-200/50"
          >
            Services
          </Link>
          <Link
            href="#contact"
            className="px-5 py-2.5 rounded-full text-gray-700 hover:text-gray-900 hover:bg-white/80 text-sm font-medium leading-normal transition-all duration-300 ease-in-out hover:shadow-sm border border-transparent hover:border-gray-200/50"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {!session ? (
            <>
              <Link href="/auth/signup">
                <Button variant="primary">Sign Up</Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="secondary">Log In</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/cart">
                <Button
                  style={{
                    backgroundColor: "var(--primary-color)", // red bg
                    color: "white",
                  }}
                >
                  Cart
                </Button>
              </Link>
              <Button
                variant="secondary"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Log Out
              </Button>
            </>
          )}
          <button
            className="md:hidden text-[var(--secondary-color)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-icons">menu</span>
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
