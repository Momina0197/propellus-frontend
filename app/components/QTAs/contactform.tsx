"use client";

import Image from "next/image";
import React, { useState } from "react";

const GetStartedComponent = () => {
  const [form, setForm] = useState({
    yourName: "",
    companyName: "",
    email: "",
    weAre: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <section className="relative w-full bg-white py-16 px-6 lg:px-20 overflow-hidden shadow-lg">
      {/* Background Vector 1 */}
      <div
        className="absolute inset-0 left-90  bg-no-repeat opacity-90"
        style={{
          backgroundImage: `url('/images/Vector01.png')`,
          backgroundSize: "120%", // 🔹 Larger size
          backgroundPosition: "center 0px", // 🔹 Lower the vector
        }}
      ></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Section */}
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
            Get started with Propellus
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Fill out this form and a specialist from our sales team will reach
            out to you within minutes.
          </p>
          <p className="mt-6 text-sm text-gray-500">
            TRUSTED BY LEADING TRAVEL AGENCIES
          </p>
          <div className="flex items-center gap-6 mt-4">
            <Image
              src="/images/image 147.png"
              alt="Aeg"
              width={80}
              height={40}
              className="opacity-50"
            />
            <Image
              src="/images/image 149.png"
              alt="Wego"
              width={80}
              height={40}
              className="opacity-50"
            />
            <Image
              src="/images/image 146.png"
              alt="Gozayaan"
              width={50}
              height={20}
              className="opacity-50"
            />
            <Image
              src="/images/image 148.png"
              alt="PrinceVisa"
              width={80}
              height={40}
              className="opacity-50"
            />
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-auto text-center shadow-lg">
          {/* Centered Heading */}
          <h3 className="text-[28px] font-semibold text-black mb-4">
            Tell us about you
          </h3>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Name + Company Name in one row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="yourName"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  Your Name
                </label>
                <input
                  id="yourName"
                  type="text"
                  name="yourName"
                  placeholder="e.g John Doe"
                  value={form.yourName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm text-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  Company Name
                </label>
                <input
                  id="companyName"
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={form.companyName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm text-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Email + "We are" in one row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  className="w-full border border-gray-300 rounded-md p-2 text-sm text-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="weAre"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  I/We are
                </label>
                <select
                  id="weAre"
                  name="weAre"
                  value={form.weAre}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm text-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="individual">Individual</option>
                  <option value="company">Company</option>
                </select>
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
                className="w-full border border-gray-300 rounded-md p-2 h-20 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Colored Button */}
            <button
              type="submit"
              className="w-full bg-[#1C3F5D] text-white text-[16px] font-medium py-2 rounded-md hover:opacity-90 transition"
            >
              Submit
            </button>
          </form>

          {/* Terms Text Centered */}
          <p className="text-[12px] max-w-[350px] mx-auto text-gray-500 mt-3 leading-snug text-center">
            By submitting this form, you are agreeing to Propellus{" "}
            <a href="#" className="text-[#1C3F5D] font-semibold underline">
              Privacy Policy
            </a>{" "}
            <span className="text-[#1C3F5D] font-semibold"> and </span>
            <a href="#" className="text-[#1C3F5D] font-semibold underline">
              Terms of Service
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default GetStartedComponent;
