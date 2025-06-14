"use client";

import React from "react";
import Link from "next/link";
import Navbar from "../../lib/components/navbar";

const Homepage = () => {
  return (
    <>
      <style jsx global>{`
        :root {
          --primary-color: #e53e3e;
          --secondary-color: #1a202c;
          --accent-color: #fed7d7;
          --text-primary: #1a202c;
          --text-secondary: #718096;
          --background-light: #fef2f2;
          --background-card: #ffffff;
        }

        body {
          font-family: "Lexend", "Noto Sans", sans-serif;
        }

        .hero-bg-image {
          background: #545353; /* or any other shade of gray you prefer */
        }

        .gradient-text {
          background: linear-gradient(to right, var(--primary-color), #c53030);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hover-lift {
          transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
        }

        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .smooth-scroll {
          scroll-behavior: smooth;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out forwards;
        }

        .icon-container {
          background-color: var(--primary-color);
          color: white;
          padding: 12px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }
      `}</style>

      <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <Navbar />

          <main className="flex-1">
            {/* Hero Section */}
            <section className="relative hero-bg-image text-white" id="hero">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative px-6 md:px-10 lg:px-20 py-24 md:py-32 lg:py-40 flex flex-col items-center text-center">
                <div className="max-w-3xl animate-fadeIn">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tighter mb-6">
                    Your Health,{" "}
                    <span className="gradient-text">Simplified.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-slate-100 mb-10 max-w-2xl mx-auto">
                    HealthPlus delivers prescriptions and over-the-counter
                    medications right to your door. Enjoy the convenience of
                    online refills, expert advice, and fast, reliable service.
                  </p>
                  <Link
                    href="#get-started"
                    className="inline-flex items-center justify-center min-w-[180px] cursor-pointer overflow-hidden rounded-full h-14 px-8 bg-[var(--primary-color)] text-white text-lg font-semibold leading-normal tracking-wide shadow-xl hover:bg-red-700 transform hover:scale-105 transition-all duration-300 ease-in-out group"
                  >
                    <span className="truncate">Get Started Now</span>
                    <span className="material-icons ml-2 transform group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </Link>

                  <div
                    className="mt-16 flex justify-center gap-6 md:gap-10 animate-fadeIn"
                    style={{ animationDelay: "0.3s" }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="icon-container bg-white/25 text-[var(--primary-color)] p-4 rounded-full mb-2 shadow-lg">
                        <span className="material-icons text-3xl">
                          medication
                        </span>
                      </div>
                      <p className="text-sm text-slate-200">Prescriptions</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="icon-container bg-white/25 text-[var(--primary-color)] p-4 rounded-full mb-2 shadow-lg">
                        <span className="material-icons text-3xl">
                          local_shipping
                        </span>
                      </div>
                      <p className="text-sm text-slate-200">Fast Delivery</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="icon-container bg-white/25 text-[var(--primary-color)] p-4 rounded-full mb-2 shadow-lg">
                        <span className="material-icons text-3xl">
                          support_agent
                        </span>
                      </div>
                      <p className="text-sm text-slate-200">Expert Advice</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Services Section */}
            <section
              className="py-16 md:py-24 bg-[var(--background-light)]"
              id="services"
            >
              <div className="max-w-5xl mx-auto px-6 md:px-10">
                <div className="text-center mb-12 md:mb-16 animate-slideInUp">
                  <h2 className="text-3xl md:text-4xl font-bold text-[var(--secondary-color)] tracking-tight mb-4">
                    How HealthPlus Works
                  </h2>
                  <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                    Experience the ease of managing your medications online in
                    three simple steps.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                  <div
                    className="flex flex-col items-center text-center p-6 bg-[var(--background-card)] rounded-xl shadow-lg hover-lift animate-slideInUp"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <div className="icon-container">
                      <span className="material-icons text-3xl">
                        receipt_long
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--secondary-color)] mb-3">
                      Order Online
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      Upload your prescription or request a refill. Browse our
                      extensive catalog of medications and health products.
                    </p>
                  </div>

                  <div
                    className="flex flex-col items-center text-center p-6 bg-[var(--background-card)] rounded-xl shadow-lg hover-lift animate-slideInUp"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <div className="icon-container">
                      <span className="material-icons text-3xl">
                        local_shipping
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--secondary-color)] mb-3">
                      Fast Delivery
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      Receive your order quickly and discreetly, delivered right
                      to your doorstep. Track your shipment in real-time.
                    </p>
                  </div>

                  <div
                    className="flex flex-col items-center text-center p-6 bg-[var(--background-card)] rounded-xl shadow-lg hover-lift animate-slideInUp"
                    style={{ animationDelay: "0.3s" }}
                  >
                    <div className="icon-container">
                      <span className="material-icons text-3xl">
                        chat_bubble_outline
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--secondary-color)] mb-3">
                      Expert Support
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      Our licensed pharmacists are available to answer your
                      questions and provide personalized guidance.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Visuals Section */}
            <section className="py-16 md:py-24 bg-white" id="visuals">
              <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--secondary-color)] tracking-tight mb-4 animate-slideInUp">
                  Visualizing Your Health Journey
                </h2>
                <p
                  className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-12 animate-slideInUp"
                  style={{ animationDelay: "0.1s" }}
                >
                  Imagine a seamless experience with interactive visuals guiding
                  you through your medication management.
                </p>

                <div
                  className="aspect-video bg-gradient-to-br from-red-100 to-rose-200 rounded-xl shadow-2xl flex items-center justify-center p-8 animate-fadeIn"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                    <div className="flex flex-col items-center space-y-3 p-4 bg-white/50 backdrop-blur-sm rounded-lg shadow-md hover-lift">
                      <span className="material-icons text-4xl text-[var(--primary-color)]">
                        medication
                      </span>
                      <p className="text-sm font-medium text-[var(--secondary-color)]">
                        Pill Reminders
                      </p>
                    </div>
                    <div className="flex flex-col items-center space-y-3 p-4 bg-white/50 backdrop-blur-sm rounded-lg shadow-md hover-lift">
                      <span className="material-icons text-4xl text-[var(--primary-color)]">
                        local_pharmacy
                      </span>
                      <p className="text-sm font-medium text-[var(--secondary-color)]">
                        Refill Tracking
                      </p>
                    </div>
                    <div className="flex flex-col items-center space-y-3 p-4 bg-white/50 backdrop-blur-sm rounded-lg shadow-md hover-lift">
                      <span className="material-icons text-4xl text-[var(--primary-color)]">
                        health_and_safety
                      </span>
                      <p className="text-sm font-medium text-[var(--secondary-color)]">
                        Side Effects Info
                      </p>
                    </div>
                    <div className="flex flex-col items-center space-y-3 p-4 bg-white/50 backdrop-blur-sm rounded-lg shadow-md hover-lift">
                      <span className="material-icons text-4xl text-[var(--primary-color)]">
                        receipt
                      </span>
                      <p className="text-sm font-medium text-[var(--secondary-color)]">
                        Dosage Guide
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* Footer */}
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
                        href="#shop"
                        className="hover:text-[var(--primary-color)] transition-colors"
                      >
                        Shop
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#services"
                        className="hover:text-[var(--primary-color)] transition-colors"
                      >
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#faqs"
                        className="hover:text-[var(--primary-color)] transition-colors"
                      >
                        FAQs
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Legal
                  </h3>
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
                    <li>
                      <Link
                        href="#contact"
                        className="hover:text-[var(--primary-color)] transition-colors"
                      >
                        Contact Us
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
        </div>
      </div>
    </>
  );
};

export default Homepage;
