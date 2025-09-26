
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface Logo {
  id: number;
  logoImage: {
    url: string;
    name: string;
  };
}

interface HeroSection {
  title: any[];
  intro: any[];
  desc: string;
  logos: Logo[];
}

export default function TravelVisaSection() {
  const [hero, setHero] = useState<HeroSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/otas", { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        const json = await res.json();
        setHero(json?.data?.heroSection || null);
      } catch (err) {
        console.error("Failed to fetch OTAs data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (!hero) {
    return <p className="text-center py-10 text-red-500">No data found</p>;
  }

  return (
    <section className="relative w-full bg-white overflow-hidden">
      <Image
        src="/images/Vector01.png"
        alt="Vector01"
        width={1000}
        height={1000}
        className="absolute top-0 right-0 z-0 opacity-90"
      />
      <Image
        src="/images/Vector02.png"
        alt="Vector02"
        width={550}
        height={550}
        className="absolute top-10 right-0 rotate-3 z-0 opacity-90"
      />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 grid-cols-1 gap-8 lg:gap-16 xl:gap-20 items-center px-6 mb-22 lg:px-20 mt-22 relative z-10">
  <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-snug">
      {hero.title?.[0]?.children?.[0]?.text}
    </h2>
    <p className="my-10 text-gray-600 text-lg">
      {hero.intro?.[0]?.children?.[0]?.text}
    </p>
    <p className="text-sm text-gray-800 uppercase mb-3">{hero.desc}</p>
    <div className="flex items-center gap-8 w-full justify-space-between justify-center lg:justify-start">
      {hero.logos?.map((logo) => (
        <Image
          key={logo.id}
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${logo.logoImage.url}`}
          alt={logo.logoImage.name}
          width={80}
          height={50}
          className="opacity-50 object-contain max-h-[50] max-w-[80] brightness-0"
        />
      ))}
    </div>
  </div>


        {/* Right Section - static form */}
        <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 w-full max-w-sm mx-auto text-center relative z-20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Talk to Founders
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3 text-left">
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

            <button
              type="submit"
              className="w-full bg-[#1C3F5D] text-white text-sm font-medium py-2 rounded-md hover:opacity-90 transition"
            >
              Submit
            </button>
          </form>

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
