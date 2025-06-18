"use client";

import React from "react";
import Image from "next/image";
import Footer from "../../../lib/components/footer";
import Navbar from "../../../lib/components/navbar";

const AboutPage: React.FC = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-slate-50 text-[var(--text-primary)]">
      {/* Main Content */}
      <Navbar />
      <main className="flex flex-1 justify-center py-8 md:py-12">
        <div className="layout-content-container flex flex-col max-w-4xl flex-1 px-4 sm:px-6 lg:px-8">
          {/* About Section */}
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              About HealthPlus
            </h1>
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              HealthPlus is a leading online pharmacy dedicated to providing
              accessible, affordable, and high-quality healthcare solutions. Our
              mission is to empower individuals to take control of their health
              by offering a wide range of prescription medications,
              over-the-counter products, and personalized health services. We
              are committed to delivering exceptional customer care and ensuring
              a seamless and convenient pharmacy experience for all.
            </p>
          </section>

          {/* Story & Mission */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <section>
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                  Founded in 2020, HealthPlus was born out of a desire to
                  revolutionize the pharmacy industry. Our founders, a team of
                  experienced pharmacists and healthcare professionals,
                  recognized the need for a more patient-centric approach to
                  healthcare.
                </p>
              </div>
            </section>
            <section>
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                  Our mission is to make healthcare accessible, affordable, and
                  convenient for everyone. We strive to provide a seamless
                  online pharmacy experience and empower individuals to take
                  control of their health and well-being.
                </p>
              </div>
            </section>
          </div>

          {/* Values */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                [
                  "Patient-Centric Care",
                  "We prioritize personalized care for our customers.",
                ],
                ["Transparency", "We value honest communication."],
                ["Accessibility", "Healthcare should be easy and affordable."],
                ["Innovation", "We embrace tech to improve outcomes."],
                ["Integrity", "Ethical, safe, and reliable service."],
                ["Community", "We aim to make a positive impact."],
              ].map(([title, text]) => (
                <div key={title} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-[var(--text-secondary)] text-sm">{text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Team */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {[
                {
                  name: "Dr. Emily Carter",
                  title: "Chief Pharmacist",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuArJV4LeOU9zSw_aw2xYv8lUXQXB2j9ekQKvYvmwubHPE6gQQf6V3tBFjRMDNvcQz6e2Mqc6UR6KKkUnXA4VTHGhr2H7OCoiLju97UWJtEZO8Lr_qpFLjiUehg5PZLVW9hDgkF9QfrGkeo4gWeGdg8CbgwZSV9S575iSqySrptYTXDuS0fLAvqtYgfLpWMaMvSG2bbOVoXGgLpZ-h7MjkEdXoqer8gnnf8pWAllVFeUI3e8YgSpd9PRpfpV-2CMcjt-5urdGYm80cJa",
                },
                {
                  name: "Dr. David Lee",
                  title: "Clinical Pharmacist",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAg9P8Lx-sTSo0J5n63jWFjokyW_rprUlvsJkx8U5iEfnsq5NzN0AAa0FdtsfiyKxTOOiXtDV8gbQ14C9-q0e_D5s7zL8yG6kQxdj4CQK4khpA2nvpyLlgnGMrDILlRjDwORcuTjoJWzQk8ZQumQCwerbjzlle5iEaZXXvGWbPH4-b7OtKfDBWsARtIWvqY5jIy6sS9pYlZKCPmUYPblVZgiN-nwlKSqm9fVxdTwBH7bA6Nh2Pw1duaYTqGHgsFSks3pzbFnrUGM5fz",
                },
                {
                  name: "Dr. Sarah Chen",
                  title: "Operations Manager",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsYHt_cEzvtpSyIyXG3hcNzd-P05Qgd2bGUC93b8OQBw3hO2xQb6gjWrG_Qs7XEtlY3ehI1PBYRUkP1G6QPDCNfTTj8OMQJ3hWhw5vxHPmX84f276NTot8RNoPvE0EVkGgSaZdCxqxEgLq2RQAWvEvkpqOrHL47CEoSqnhFh4Fp4Ex2LjcIAhk8HnwGT6w7Ry9KVrMdk15VUvbqiHCmQQFzPSuOwxCGFc7SJCUg_1LduFZR5cCPKSs3ri7h5ti0oexB5oymXIQ3K3b",
                },
              ].map((member) => (
                <div
                  key={member.name}
                  className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all"
                >
                  <div className="w-32 h-32 mb-4">
                    <div
                      className="w-full h-full bg-center bg-no-repeat aspect-square bg-cover rounded-full border-4 border-[var(--primary-color)]"
                      style={{ backgroundImage: `url('${member.img}')` }}
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-[var(--text-primary)]">
                      {member.name}
                    </p>
                    <p className="text-[var(--text-secondary)]">
                      {member.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-lg leading-relaxed text-[var(--text-secondary)] text-center">
              Our team of experienced pharmacists and healthcare professionals
              is dedicated to providing exceptional care and support to our
              customers. We are passionate about helping people achieve their
              health goals and are committed to delivering the highest quality
              pharmacy services.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;
