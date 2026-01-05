"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { ChevronDown } from "lucide-react";
import Footer from "../components/Footer";

const faqs = [
  {
    question: "What is the Admin Panel used for?",
    answer:
      "The Admin Panel allows administrators to manage users, monitor system activity, control roles, and securely handle platform operations from a centralized dashboard.",
  },
  {
    question: "How do I access the Admin Dashboard?",
    answer:
      "You can access the admin dashboard by logging in with authorized credentials at admin-dashboard.buttnetworks.com. Only verified users can enter the dashboard.",
  },
  {
    question: "Is the Admin Panel secure?",
    answer:
      "Yes. The admin panel uses encrypted authentication, secure sessions, role-based access control, and protected APIs to ensure maximum security.",
  },
  {
    question: "Can I manage users from the dashboard?",
    answer:
      "Administrators can view, edit, suspend, or remove users, assign roles, and monitor user activity directly from the dashboard.",
  },
  {
    question: "What happens if I forget my password?",
    answer:
      "If you forget your password, use the password recovery option on the login page to securely reset your credentials.",
  },
  {
    question: "Does the Admin Panel support activity monitoring?",
    answer:
      "Yes. The dashboard provides real-time monitoring, logs, and alerts for suspicious activities to help maintain system integrity.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900">
               FAQ
            </h1>
            <p className="mt-4 text-gray-600">
              Frequently asked questions about the Butt Networks Admin Dashboard
            </p>
          </div>

          {/* FAQ Cards */}
          <div className="space-y-5">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left"
                >
                  <span className="text-lg font-semibold text-gray-800">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`transition-transform duration-300 ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {activeIndex === index && (
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-14 text-center text-sm text-gray-500">
            Need more help? Contact the system administrator or support team.
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default FAQ;
