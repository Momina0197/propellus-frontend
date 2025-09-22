"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubscribing(true);

    try {
      console.log("Subscribing email:", email);
      setEmail("");
      alert("Successfully subscribed to our newsletter!");
    } catch (error) {
      console.error("Subscription error:", error);
      alert("Failed to subscribe. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-[#222222] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section with Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
          {/* Solutions */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Solutions</h3>
            <ul className="space-y-3">
              {[
                { href: "/for-travelers", label: "For Travelers" },
                { href: "/for-travel-agents", label: "For Travel Agents" },
                { href: "/for-otas", label: "For OTAs" },
                { href: "/for-brand-partners", label: "For Brand Partners" },
                { href: "/for-investors", label: "For Investors" },
              ].map((item) => (
                <li key={item.href} className="flex items-center">
                  <span className="mr-2">›</span>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              {[
                { href: "/help-center", label: "Help Center" },
                { href: "/documentation", label: "Documentation" },
                { href: "/blog", label: "Propellus Blog" },
                { href: "/demo", label: "View Demo" },
              ].map((item) => (
                <li key={item.href} className="flex items-center">
                  <span className="mr-2">›</span>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-6">About</h3>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/esg", label: "ESG" },
                { href: "/kyc-kyb", label: "KYC/KYB" },
                { href: "/contact", label: "Contact Here" },
              ].map((item) => (
                <li key={item.href} className="flex items-center">
                  <span className="mr-2">›</span>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t border-gray-700 my-12"></div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          {/* Logo + Socials */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8 flex-1">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center">
                <Image
                  src={"/logo_footer.svg"}
                  height={40}
                  width={128}
                  alt="logo"
                />
              </div>
              <div className="flex items-center space-x-4">
                {["facebook", "insta", "x", "titktok", "linkedin"].map(
                  (icon) => (
                    <Link
                      key={icon}
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      <Image
                        src={`/${icon}.svg`}
                        height={20}
                        width={20}
                        alt={icon}
                      />
                    </Link>
                  )
                )}
              </div>
            </div>

            {/* Description */}
            <div className="flex-1">
              <p className="text-sm max-w-md">
                Propellus helps travel agents and OTAs offer fully automated
                visa-processing services to travelers.
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="w-full lg:w-auto">
            <h3 className="text-lg font-semibold mb-4">
              Subscribe to our emails
            </h3>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="flex-1 px-4 py-2 bg-white border border-white rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 min-w-[250px]"
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="px-6 py-2 bg-[#00C2CB] disabled:bg-[#00C2CB] text-white font-medium rounded-md transition-colors duration-200 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isSubscribing ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-4">
          <p className="text-sm mb-4 md:mb-0">© 2024, Propellus.</p>
          <div className="flex space-x-6 text-sm">
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/cookie-policy" className="hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
