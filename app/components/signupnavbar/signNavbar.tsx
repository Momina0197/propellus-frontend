import React, { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

const SignNavbar = () => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src={"logo.svg"}
              alt="Propellus Logo"
              width={120}
              height={50}
            />
          </Link>

          {/* Nav links and buttons */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:items-center">
            {/* Help Dropdown */}
            <div className="relative">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-900 focus:outline-none flex items-center"
                onClick={() => setIsHelpOpen(!isHelpOpen)}
              >
                Help
                <ChevronDownIcon
                  className="-mr-1 ml-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </button>
              {isHelpOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div className="py-1" role="none">
                    <Link
                      href="/support"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Support
                    </Link>
                    <Link
                      href="/faq"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      FAQ
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Login Link */}
            <Link
              href="/login"
              className="text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              Login
            </Link>

            {/* Sign Up Link (button style) */}
            <Link
              href="/signup"
              className="inline-flex items-center px-4 py-2 border border-blue-500 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SignNavbar;
