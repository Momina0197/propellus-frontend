// components/FAQ.jsx
"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const faqData = [
  {
    question: "How does the visa application process work?",
    answer:
      "The process is simple: 1. Check visa requirements. 2. Upload your documents securely. 3. Review and pay. We handle the rest, including pre-filling forms with OCR technology.",
  },
  {
    question: "What documents do I need to upload?",
    answer:
      "Required documents typically include a passport-sized photo, a clear scan of your passport's bio-page, and depending on the destination, a flight itinerary and hotel booking. Our platform will guide you on the specific documents needed for your chosen visa.",
  },
  {
    question: "Is my personal data secure?",
    answer:
      "Yes, we take data security seriously. All documents and personal information are encrypted during transmission and storage. We also comply with global data privacy regulations, ensuring your information is handled securely.",
  },
  {
    question: "How long does the processing take?",
    answer:
      "Processing times vary based on the country and visa type. Our platform provides estimated processing times for each option. For urgent travel, we also offer express services.",
  },
  {
    question: "Can I upload documents in any format?",
    answer:
      "We accept all standard document formats including PDF, JPEG, and PNG. For best results, we recommend high-resolution scans or photos of your documents.",
  },
];

const FAQ = ({ heading = "Frequently Asked Questions", subheading = "MOST COMMON QUESTIONS" }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(2);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto text-center mb-12">
        {/* Subheading only if provided */}
        {subheading && (
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">
            {subheading}
          </p>
        )}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
          {heading}
        </h2>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
          >
            <button
              onClick={() => handleToggle(index)}
              className="flex justify-between items-center w-full p-6 text-left"
            >
              <span className="text-lg font-semibold text-gray-800">
                {item.question}
              </span>
              <ChevronDownIcon
                className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6 text-gray-600 leading-relaxed transition-all duration-500 ease-in-out">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
