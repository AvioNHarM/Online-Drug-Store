"use client";

import Link from "next/link";
import React, { useState } from "react";
import { registerAndLogin } from "../../../../lib/api/auth";
import UserMessage from "../../../../lib/components/ui/userMassage";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!acceptedTerms) {
      setError("You must accept the Terms of Service and Privacy Policy.");
      return;
    }

    const result = await registerAndLogin(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    alert("Registration successful!");
    setEmail("");
    setPassword("");
    setAcceptedTerms(false);

    router.push("/?registered=1");
  };

  return (
    <main className="min-h-screen bg-white text-[var(--text-primary)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-xl shadow-xl">
        <div className="flex flex-col items-center">
          <div className="size-10 text-[var(--primary-color)]">
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
          </div>
          <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Create your account
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--text-primary)] pb-1.5"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="form-input w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-input)] px-4 py-3 text-base text-[var(--text-primary)] placeholder:text-[var(--soft-text)] focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] transition-colors duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--text-primary)] pb-1.5"
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
              required
            />
          </div>

          <div className="flex items-center">
            <input
              id="terms-and-privacy"
              name="terms-and-privacy"
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="checkbox-custom h-4 w-4 rounded border-[var(--border-color)] text-[var(--primary-color)] focus:ring-0 focus:ring-offset-0 focus:outline-none"
            />
            <label
              htmlFor="terms-and-privacy"
              className="ml-2 block text-sm text-[var(--text-primary)]"
            >
              I agree to the{" "}
              <a
                href="#"
                className="font-medium text-[var(--primary-color)] hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-medium text-[var(--primary-color)] hover:underline"
              >
                Privacy Policy
              </a>
              .
            </label>
          </div>

          {error && (
            <UserMessage
              message={error}
              type="error"
              onClose={() => setError(null)}
            />
          )}

          <div>
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-lg bg-[var(--primary-color)] px-5 py-3.5 text-base font-semibold text-white shadow-md hover:bg-[var(--secondary-color-button)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 transition-colors duration-200"
            >
              create account
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--text-soft)]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[var(--primary-color)] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignupPage;
