"use client";

import Footer from "../../../lib/components/footer";
import Navbar from "../../../lib/components/navbar";

export default function TermsAndConditionsPage() {
  return (
    <div
      className="bg-white text-[var(--text-primary)] min-h-screen flex flex-col"
      style={{ fontFamily: "Lexend, 'Noto Sans', sans-serif" }}
    >
      <Navbar />

      <main className="px-6 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-10">
        <div className="flex flex-col max-w-4xl w-full">
          <div className="mb-8 border-b border-[var(--border-color)] pb-6">
            <h1 className="text-4xl font-bold leading-tight tracking-tight">
              Terms and Conditions
            </h1>
            <p className="text-[var(--text-secondary)] mt-2 text-sm">
              Last updated: July 26, 2024
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-base leading-relaxed text-[var(--text-secondary)]">
              By accessing or using the HealthPlus website ("Site") and its
              services, you signify your agreement to these Terms and
              Conditions. If you do not agree to these terms, please do not use
              our Site or services. We reserve the right to modify these terms
              at any time, so please review them frequently.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              2. User Responsibilities
            </h2>
            <p className="mb-4 text-[var(--text-secondary)] text-base leading-relaxed">
              As a user of HealthPlus, you agree to:
            </p>
            <ul className="space-y-3">
              {[
                "Provide accurate, current, and complete information during registration and when placing orders.",
                "Maintain the security and confidentiality of your account password and other credentials.",
                "Utilize the Site and services strictly for lawful purposes, adhering to all applicable local, state, national, and international laws and regulations.",
                "Be responsible for all activities that occur under your account.",
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-x-3">
                  <input
                    type="checkbox"
                    className="checkbox-custom mt-1 h-5 w-5 flex-shrink-0"
                    id={`resp${idx + 1}`}
                  />
                  <label
                    htmlFor={`resp${idx + 1}`}
                    className="text-[var(--text-secondary)] text-base leading-relaxed"
                  >
                    {text}
                  </label>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              3. Intellectual Property
            </h2>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed">
              All content featured or displayed on the Site... [truncated for
              brevity]
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              4. Limitations of Liability
            </h2>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-4">
              HealthPlus shall not be liable for any indirect... [truncated for
              brevity]
            </p>
            <ol className="list-decimal list-inside space-y-2 text-[var(--text-secondary)] text-base leading-relaxed">
              <li>
                Your access to or use of or inability to access or use the
                services;
              </li>
              <li>
                Any conduct or content of any third party on the services;
              </li>
              <li>Any content obtained from the services; or</li>
              <li>
                Unauthorized access, use, or alteration of your transmissions or
                content.
              </li>
            </ol>
            <p className="mt-4 text-[var(--text-secondary)] text-base leading-relaxed">
              In no event shall HealthPlus's aggregate liability... [truncated
              for brevity]
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Termination</h2>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed">
              HealthPlus reserves the right to terminate or suspend your
              account...
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Contact Information</h2>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-2">
              If you have any questions or concerns regarding these Terms and
              Conditions:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] text-base leading-relaxed">
              <li>
                Email:{" "}
                <a
                  href="mailto:support@healthplus.com"
                  className="text-[var(--primary-color)] hover:underline"
                >
                  support@healthplus.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a
                  href="tel:+15551234567"
                  className="text-[var(--primary-color)] hover:underline"
                >
                  (555) 123-4567
                </a>
              </li>
              <li>Address: 123 HealthPlus Way, Wellness City, HC 54321</li>
            </ul>
          </section>

          <div className="mt-10 text-center">
            <a
              href="#top"
              className="inline-flex items-center gap-2 text-[var(--primary-color)] hover:text-[#c62828] text-sm font-medium"
            >
              <svg
                fill="currentColor"
                width={16}
                height={16}
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M205.66,157.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,204.69V40a8,8,0,0,1,16,0V204.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z" />
              </svg>
              Back to top
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
