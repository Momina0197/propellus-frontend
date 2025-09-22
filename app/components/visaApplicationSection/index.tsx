"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { LandingPageData } from "../../types/strapi";

const VisaApplicationPage = () => {
  const [data, setData] = useState<LandingPageData | null>(null);

  useEffect(() => {
    fetch("/api/strapi-data")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const steps = [
    {
      icon: "/upload.svg",
      title: "Upload Documents",
      description: "Securely upload all required documents",
    },
    {
      icon: "/application.svg",
      title: "Review Application",
      description: "Review and verify your application details",
    },
    {
      icon: "/checkout.svg",
      title: "Checkout and Pay",
      description: "Complete payment and submit your application",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-full mx-auto">
        {/* Header Section */}
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
            FOR TRAVELERS
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
            {data?.visasection?.heading || "Apply for visa in just a few clicks"}
          </h1>

          {/* Steps */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-16">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-center max-w-xs"
              >
                <Image
                  src={step.icon}
                  alt={step.title}
                  width={52}
                  height={52}
                  className="w-[52px] h-[52px]"
                />
                <h3 className="text-lg font-normal text-[#6A6A6A]">
                  {step.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Main Application Interface with blue border */}
   <div className="flex justify-center mt-12">
  <div
    className={`rounded-2xl shadow-sm p-2 bg-white ${
      data?.visasection?.image?.[0]?.url ? "border-4 border-[#5CE1E6]" : ""
    }`}
  >
    <Image
      src={data?.visasection?.image?.[0]?.url || "/img-1.svg"}
      alt="Dubai Single Tourist Visa Application Interface"
      width={1200}
      height={800}
      className="w-full max-w-8xl object-contain rounded-lg"
    />
  </div>
</div>


        {/* CTA Buttons */}
        <div className="text-center mt-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-4 px-10 rounded-lg transition-colors duration-200 text-lg">
              Get Started
            </button>
            <Link
              href="/learn-more"
              className="border-2 border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-900 font-semibold py-4 px-10 rounded-lg transition-colors duration-200 inline-flex items-center justify-center text-lg"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaApplicationPage;
