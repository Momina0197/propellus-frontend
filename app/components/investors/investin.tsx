"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface FormData {
  heading1: string;
  heading2: string;
  image?: {
    url: string;
    alternativeText?: string;
  };
}

function getStrapiMediaUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("/")) {
    return `${
      process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337"
    }${url}`;
  }
  return url;
}

const InvestInPropellus = () => {
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch("/api/investors-data", {
          cache: "no-store",
        });
        const data = await response.json();
        console.log("Form data received:", data);

        if (data.form) {
          setFormData(data.form);
        } else {
          // fallback if Strapi returns nothing
          setFormData({
            heading1: "INVEST IN PROPELLUS",
            heading2: "Second Angel <br/> Round Now <br/> Open",
            image: { url: "/images/Angel.png", alternativeText: "Angel" },
          });
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
        setFormData({
          heading1: "INVEST IN PROPELLUS",
          heading2: "Second Angel <br/> Round Now <br/> Open",
          image: { url: "/images/Angel.png", alternativeText: "Angel" },
        });
      }
    };

    fetchFormData();
  }, []);

  if (!formData) return null;

  const imgUrl =
    getStrapiMediaUrl(formData.image?.url) || "/images/Angel.png";

  return (
    <div className="relative py-12 px-4 md:px-8 overflow-hidden bg-[#1C3F5D]">
      {/* Background vectors */}
      <Image
        src="/images/formleftVector.png"
        alt="Left background shading"
        width={800}
        height={600}
        className="absolute top-0 left-0 w-2/4 h-full object-cover z-10 opacity-100"
      />
      <Image
        src="/images/formrightVector.png"
        alt="Right background shading"
        width={400}
        height={600}
        className="absolute bottom-0 right-0 w-1/4 h-full object-cover z-0 opacity-120"
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-2 lg:space-x-6">
        {/* Left content section */}
        <div className="text-center lg:text-left flex-1 px-4">
          <p className="text-white text-base font-semibold mb-3">
            {formData.heading1}
          </p>
          <h2
  className="text-[70px] md:text-[81px] font-bold text-white leading-tight mb-6 tracking-tight whitespace-pre-line"
>
  {formData.heading2 ||
    "Second Angel\nRound Now\nOpen"}
</h2>



          {/* Angel image */}
          <div className="flex justify-center mt-4">
            <Image
              src={imgUrl}
              alt={formData.image?.alternativeText || "Angel icon"}
              width={170}
              height={170}
              className="w-[170px] h-auto"
            />
          </div>
        </div>

        {/* Right form section */}
        <div className="flex-1 w-full max-w-md lg:max-w-xl">
          <div className="bg-white p-8 md:p-12 rounded-[20px] shadow-2xl">
            <h3 className="text-center text-2xl font-semibold text-gray-800 mb-6">
              Tell us about you
            </h3>
            <form className="space-y-4">
              {/* Input fields */}
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="your-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="your-name"
                    name="your-name"
                    placeholder="e.g John Doe"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="company-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company-name"
                    name="company-name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                  />
                </div>
              </div>

              {/* Email + Select */}
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="johndoe@gmail.com"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="i-we-are"
                    className="block text-sm font-medium text-gray-700"
                  >
                    I/We are
                  </label>
                  <select
                    id="i-we-are"
                    name="i-we-are"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                  >
                    <option>Select</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Type your message here"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                ></textarea>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full bg-[#1C3F5D] text-white py-3 px-6 rounded-md font-semibold text-lg hover:bg-opacity-90 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
            <p className="mt-4 text-xs text-center text-gray-500">
              By submitting this form, you are agreeing to Propellus{" "}
              <a href="#" className="text-[#1C3F5D] hover:underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#1C3F5D] hover:underline">
                Terms of Service
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestInPropellus;
