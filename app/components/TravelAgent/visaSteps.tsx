"use client";
import React from "react";
import Image from "next/image";
import { FileText, Upload, CreditCard } from "lucide-react";

interface VisaApplication {
  heading: string;
  image?: {
    url: string;
    alternativeText?: string;
  };
}

interface VisaStepsProps {
  visaApplication: VisaApplication;
}

const VisaSteps: React.FC<VisaStepsProps> = ({ visaApplication }) => {
  const steps = [
    {
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      title: "Customer checks visa requirements",
    },
    {
      icon: <Upload className="w-6 h-6 text-blue-600" />,
      title: "Upload documents, auto-fill visa with OCR",
    },
    {
      icon: <CreditCard className="w-6 h-6 text-blue-600" />,
      title: "Review and Pay",
    },
  ];

  return (
    <div className="bg-white py-16 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
          How it works
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          {visaApplication.heading || "Visa application in 3 simple steps"}
        </h2>

        {/* Steps */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-16">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 border border-blue-200">
                {step.icon}
              </div>
              <p className="text-gray-700 text-sm max-w-[180px]">
                {step.title}
              </p>
            </div>
          ))}
        </div>

        {/* Main Image */}
        {visaApplication.image?.url && (
          <div className="relative border-2 border-blue-300 rounded-xl shadow-lg overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${visaApplication.image.url}`}
              alt={visaApplication.image.alternativeText || "Visa Application Platform Interface"}
              width={1200}
              height={700}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VisaSteps;
