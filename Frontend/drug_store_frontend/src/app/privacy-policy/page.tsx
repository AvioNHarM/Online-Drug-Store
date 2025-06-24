"use client";

import { useState } from "react";
import Navbar from "../../../lib/components/navbar";
import Footer from "../../../lib/components/footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white text-[var(--text-primary)] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-8">
        <div className="max-w-4xl mx-auto bg-[var(--background-secondery)] shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 md:p-10 border-b border-[var(--border-color)]">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--primary-color)] tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-[var(--text-secondary)] text-sm mt-2">
              Last updated: October 26, 2024
            </p>
          </div>

          <div className="divide-y divide-[var(--border-color)]">
            {sections.map(({ id, icon, title, text }) => (
              <section key={id} id={id} className="scroll-mt-20">
                <div className="sticky top-0 z-10 bg-white py-5 px-6 md:px-10 border-b border-[var(--border-color)] flex items-center gap-3">
                  <i className="material-icons text-2xl text-[var(--primary-color)]">
                    {icon}
                  </i>
                  <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)] tracking-tight">
                    {title}
                  </h2>
                </div>
                <div className="p-6 md:p-10 pt-4">
                  <p className="text-[var(--text-secondary)] text-base leading-relaxed">
                    {text}
                  </p>
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const sections = [
  {
    id: "what-data-we-collect",
    icon: "inventory_2",
    title: "What Data We Collect",
    text: "We collect personal information that you provide directly to us when you use our services. This includes your name, contact details (email, phone number, address), payment information, and health-related data such as prescriptions and medical history. We also gather data automatically through cookies and similar technologies, including your IP address, browsing activity, and device information.",
  },
  {
    id: "how-we-use-it",
    icon: "settings_suggest",
    title: "How We Use It",
    text: "The information we collect is used to provide and improve our services. This includes processing your orders, managing your account, communicating with you about your health and our offerings, and personalizing your experience. We may also use your data for research and analytics to enhance our services and develop new features.",
  },
  {
    id: "data-protection",
    icon: "security",
    title: "Data Protection",
    text: "We take the security of your personal information seriously and implement robust measures to protect it from unauthorized access, alteration, disclosure, or destruction. These measures include encryption, access controls, and regular security assessments. However, no method of transmission over the internet or electronic storage is completely secure, so we cannot guarantee absolute security.",
  },
  {
    id: "third-party-sharing",
    icon: "people_alt",
    title: "Third-Party Sharing",
    text: "We may share your information with third parties who provide services on our behalf, such as payment processors, delivery services, and customer support. We ensure these third parties adhere to strict data protection standards. We may also disclose information if required by law or to protect our rights and safety or the rights and safety of others.",
  },
  {
    id: "your-rights",
    icon: "fact_check",
    title: "Your Rights",
    text: "You have the right to access, correct, or delete your personal information. You can also object to or restrict certain processing of your data. To exercise these rights, please contact us using the information provided in the 'Contact Us' section. We will respond to your request within a reasonable timeframe.",
  },
];
