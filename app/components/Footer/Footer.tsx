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

    // Add your email subscription logic here
    try {
      // Example: await subscribeToNewsletter(email);
      console.log("Subscribing email:", email);

      // Reset form after successful submission
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
          {/* Solutions Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Solutions</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="text-white mr-2">›</span>
                <Link
                  href="/for-travelers"
                  className="text-white hover:text-white transition-colors duration-200"
                >
                  For Travellers
                </Link>
              </li>
              <li className="flex items-center">
                <span className="text-white mr-2">›</span>
                <Link
                  href="/for-travel-agents"
                  className="text-white hover:text-white transition-colors duration-200"
                >
                  For Travel Agents
                </Link>
              </li>
              <li className="flex items-center">
                <span className="text-white mr-2">›</span>
                <Link
                  href="/for-otas"
                  className="text-white hover:text-white transition-colors duration-200"
                >
                  For OTAs
                </Link>
              </li>
              <li className="flex items-center">
                <span className="text-white mr-2">›</span>
                <Link
                  href="/for-brand-partners"
                  className="text-white hover:text-white transition-colors duration-200"
                >
                  For Brand Partners
                </Link>
              </li>
              <li className="flex items-center">
                <span className="text-white mr-2">›</span>
                <Link
                  href="/for-investors"
                  className="text-white hover:text-white transition-colors duration-200"
                >
                  For Investors
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Resources</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="text-white mr-2">›</span>
                <Link
                  href="/help-center"
                  className="text-white hover:text-white transition-colors duration-200"
                >
                  Help Center
                </Link>
              </li>
              <li className="flex items-center">
                <span className="text-white mr-2">›</span>
                <Link
                  href="/documentation"
                  className="text-white hover:text-white transition-colors duration-200"
                >
                  Documentation
                </Link>
              </li>
              <li className="flex items-center">
                <span className="text-white mr-2">›</span>
                <Link
                  href="/blog"
                  className="text-white hover:text-white transition-colors duration-200"
                >
                  Propellus Blog
                </Link>
              </li>
              <li className="flex items-center">
                <span className="text-white mr-2">›</span>
                <Link
                  href="/demo"
                  className="text-white hover:text-white transition-colors duration-200"
                >
                  View Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">About</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="text-white mr-2">›</span>
                <Link
                  href="/about"
                  className="text-white hover:text-white transition-colors duration-200"
                >
                  About us
                </Link>
              </li>
              <li className="flex items-center">
                <span className="text-white mr-2">›</span>
                <Link
                  href="/esg"
                  className="text-white hover:text-white transition-colors duration-200"
                >
                  ESG
                </Link>
              </li>
              <li className="flex items-center">
                <span className="text-white mr-2">›</span>
                <Link
                  href="/kyc-kyb"
                  className="text-white hover:text-white transition-colors duration-200"
                >
                  KYC/KYB
                </Link>
              </li>
              <li className="flex items-center">
                <span className="text-white mr-2">›</span>
                <Link
                  href="/contact"
                  className="text-white hover:text-white transition-colors duration-200"
                >
                  Contact here
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t border-gray-700 my-12"></div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          {/* Left: Logo, Description, and Social Icons */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8 flex-1">
            {/* Logo and Name */}
            <div className="flex flex-col  space-y-3">
              <div className="flex items-center ">
                <Image
                  src={"/logo_footer.svg"}
                  height={40}
                  width={128}
                  alt="logo"
                />
              </div>
              {/* Social Icons */}
              <div className="flex items-center space-x-4">
                <Link
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  <Image
                    src={"/facebook.svg"}
                    height={20}
                    width={20}
                    alt="logo"
                  />
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  <Image src={"/insta.svg"} height={20} width={20} alt="logo" />
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  <Image src={"/x.svg"} height={20} width={20} alt="logo" />
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  <Image
                    src={"/titktok.svg"}
                    height={20}
                    width={20}
                    alt="logo"
                  />
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  <Image
                    src={"/linkedin.svg"}
                    height={20}
                    width={20}
                    alt="logo"
                  />
                </Link>
              </div>
            </div>

            {/* Description */}
            <div className="flex-1">
              <p className="text-white text-sm max-w-md">
                Propellus helps travel agents and OTAs offer fully automated
                visa-processing services to travelers.
              </p>
            </div>
          </div>

          {/* Right: Newsletter Signup */}
          <div className="w-full lg:w-auto">
            <h3 className="text-lg font-semibold mb-4 text-white">
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
                className="flex-1 px-4 py-2 bg-white border border-white rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent min-w-[250px]"
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

        {/* Copyright and Legal Links */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-4">
          <p className="text-white text-sm mb-4 md:mb-0">© 2024, Propellus.</p>
          <div className="flex space-x-6 text-sm">
            <Link
              href="/terms"
              className="text-white hover:text-white transition-colors duration-200"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-white hover:text-white transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link
              href="/cookie-policy"
              className="text-white hover:text-white transition-colors duration-200"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
