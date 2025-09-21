"use client";

import Image from "next/image";
import { useState } from "react";

export default function TravelVisaSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // Integrate API here
  };

  return (
    <section className="relative w-full bg-white py-16 px-6 lg:px-20 overflow-hidden">
      {/* Background Images */}
      <Image
        src="/images/Vector01.png"
        alt="Vector01"
        width={1000}
        height={1000}
        className="absolute -bottom-100 left-90 z-0 opacity-90"
      />
      <Image
        src="/images/Vector02.png"
        alt="Vector02"
        width={550}
        height={550}
        className="absolute top-10 right-0 rotate-3 z-0 opacity-90"
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Section */}
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
            Offer one-window travel & visa services within your platform
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Seamlessly integrate and offer automated visa processing services to
            your customers with Propellus APIs
          </p>
          <p className="mt-6 text-sm text-gray-500">
            TRUSTED BY LEADING TRAVEL AGENCIES
          </p>
          <div className="flex items-center gap-6 mt-4">
            <Image
              src="/images/image 147.png"
              alt="wego"
              width={80}
              height={40}
              className="opacity-50"
            />
            <Image
              src="/images/image 146.png"
              alt="aeg"
              width={50}
              height={40}
              className="opacity-50"
            />
            <Image
              src="/images/image 148.png"
              alt="gozayaan"
              width={100}
              height={40}
              className="opacity-50"
            />
          </div>
        </div>

        {/* Right Section (Updated Form) */}
        <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 w-full max-w-sm mx-auto text-center relative z-20">
          {/* Centered Heading */}
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Talk to Founders
          </h3>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 text-left">
            {/* Name + Email in one row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="e.g John Doe"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full text-black placeholder:text-black border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="johndoe@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full text-black placeholder:text-black border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Type your message here"
                value={form.message}
                onChange={handleChange}
                className="w-full border text-black placeholder:text-black border-gray-300 rounded-md p-2 h-20 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Colored Button */}
            <button
              type="submit"
              className="w-full bg-[#1C3F5D] text-white text-sm font-medium py-2 rounded-md hover:opacity-90 transition"
            >
              Submit
            </button>
          </form>

          {/* Terms Text Centered */}
          <p className="text-[11px] text-gray-500 mt-3 leading-snug text-center">
            By submitting this form, you are agreeing to Propellus{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
