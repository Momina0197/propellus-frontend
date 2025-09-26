
"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

type RichTextChild = { type: string; text?: string };
type RichTextBlock = { type: string; children?: RichTextChild[] };

type Logo = {
  id: number;
  logoImage: {
    id: number;
    url: string;
    name?: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
  };
};

type HeroSectionType = {
  title: RichTextBlock[];
  intro: RichTextBlock[];
  desc: string;
  logos: Logo[];
};

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

const GetStartedComponent = () => {
  const [data, setData] = useState<HeroSectionType | null>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    yourName: "",
    companyName: "",
    email: "",
    weAre: "",
    message: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/otas/contactForm", { cache: "no-store" });
        const json = await res.json();
        if (json.data) setData(json.data);
      } catch (err) {
        console.error("Error fetching heroSection:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  const getImageUrl = (url: string) => (url.startsWith("http") ? url : `${STRAPI_URL}${url}`);

  if (loading) return <div className="text-center py-16">Loading...</div>;

  return (
    <section className="relative w-full bg-white py-16 px-6 lg:px-20 overflow-hidden shadow-lg mb-22 ">
      <div
        className="absolute inset-0 left-90 bg-no-repeat opacity-90"
        style={{
          backgroundImage: `url('/images/Vector01.png')`,
          backgroundSize: "120%",
          backgroundPosition: "center 0px",
        }}
      ></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Section */}
        <div>
          {data?.title?.map((block, i) =>
            block.type === "paragraph" ? (
              <h2 key={i} className="text-3xl lg:text-4xl font-bold text-gray-800 leading-snug">
                {block.children?.map((child) => child.text).join("")}
              </h2>
            ) : null
          )}
          {data?.intro?.map((block, i) =>
            block.type === "paragraph" ? (
              <p key={i} className="mt-10 text-gray-600 text-lg md:text-xl">
                {block.children?.map((child) => child.text).join("")}
              </p>
            ) : null
          )}

          <p className="mt-10 text-sm md:text-base text-gray-800">{data?.desc}</p>

          <div className="flex items-center gap-16 mt-2 flex-wrap">
            {data?.logos?.map((logo) => (
              <Image
                key={logo.id}
                src={getImageUrl(logo.logoImage.url)}
                alt={logo.logoImage.alternativeText || logo.logoImage.name || "logo"}
                width={logo.logoImage.width || 80}
                height={logo.logoImage.height || 50}
                className="opacity-50 object-contain max-w-[80px] max-h-[50] brightness-0"
              />
            ))}
          </div>
        </div>

        {/* Right Section (Form stays static) */}
        <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-auto text-center shadow-lg">
          <h3 className="text-[28px] font-semibold text-black mb-4">Tell us about you</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="yourName" className="block text-xs font-medium text-gray-700 mb-1">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
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
                <label htmlFor="weAre" className="block text-xs font-medium text-gray-700 mb-1">
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

            <div>
              <label htmlFor="message" className="block text-xs font-medium text-gray-700 mb-1">
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

            <button
              type="submit"
              className="w-full bg-[#1C3F5D] text-white text-[16px] font-medium py-2 rounded-md hover:opacity-90 transition"
            >
              Submit
            </button>
          </form>
          <p className="text-[12px] max-w-[350px] mx-auto text-gray-500 mt-3 leading-snug text-center">
            By submitting this form, you are agreeing to Propellus{" "}
            <a href="#" className="text-[#1C3F5D] font-semibold underline">
              Privacy Policy
            </a>{" "}
            <span className="text-[#1C3F5D] font-semibold"> and </span>
            <a href="#" className="text-[#1C3F5D] font-semibold underline">
              Terms of Service
            </a>
          </p>
        </div>
        </div>
    </section>
  );
};

export default GetStartedComponent;
