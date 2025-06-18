"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Head>
        <title>Login - QuickRx</title>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?display=swap&family=Lexend:wght@300;400;500;600;700&family=Noto+Sans:wght@400;500;700;900"
        />
      </Head>

      <main className="bg-[var(--bg-light)] min-h-screen flex flex-col">
        {/* Navbar component goes here */}

        <div className="flex flex-1 items-center justify-center py-8 sm:py-12 px-4">
          <div className="w-full max-w-md flex flex-col items-center gap-6 rounded-xl bg-white p-6 sm:p-10 shadow-lg border border-[var(--border-color)]">
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
            <h2 className="text-[var(--text-primary)] text-2xl sm:text-3xl font-bold text-center leading-tight tracking-tight">
              Welcome Back
            </h2>

            <form
              className="w-full space-y-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="mb-1.5 text-sm font-medium text-[var(--soft-text)]"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="form-input w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-input)] px-4 py-3 text-base text-[var(--text-primary)] placeholder:text-[var(--soft-text)] focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] transition-colors duration-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="mb-1.5 text-sm font-medium text-[var(--soft-text)]"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="form-input w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-input)] px-4 py-3 text-base text-[var(--text-primary)] placeholder:text-[var(--soft-text)] focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] transition-colors duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <Link
                  href="#"
                  className="text-sm font-medium text-[var(--primary-color)] hover:text-[var(--secondary-color-button)] hover:underline transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-[var(--primary-color)] px-5 py-3.5 text-base font-semibold text-white shadow-md hover:bg-[var(--secondary-color-button)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 transition-colors duration-200"
              >
                Login
              </button>
            </form>

            <p className="text-sm text-[var(--soft-text)]">
              Don't have an account?{" "}
              <Link
                href="#"
                className="font-medium text-[var(--primary-color)] hover:text-[var(--secondary-color)] hover:underline transition-colors duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
