"use client";

import React, { useState } from "react";
import Image from "next/image";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import SignNavbar from "@/app/components/signupnavbar/signNavbar";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SignNavbar />
      <div className="flex-grow flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 w-84 h-auto opacity-10 z-0"
          style={{ transform: "translateX(250px)" }}
        >
          <Image
            src="/images/signin.png"
            alt="Abstract Background Pattern"
            width={256}
            height={256}
          />
        </div>

        {/* Login Card */}
        <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-lg z-10 border border-gray-100">
          {/* Heading */}
          <div className="text-left">
            <h2 className="text-2xl font-bold text-gray-900">Join us today</h2>
            <p className="mt-1 text-sm text-gray-600">
              Enter your email address to register
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                I agree to the{" "}
                <span className="font-medium">Terms and Conditions</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="relative text-center my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <span className="relative inline-block px-2 bg-white text-gray-500 text-sm">
              OR
            </span>
          </div>

          {/* Social Logins */}
          <div className="space-y-2">
            {/* Google */}
            <button className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200">
              <FcGoogle className="w-5 h-5 mr-2" />
              Continue with Google
            </button>

            {/* Facebook */}
            <button className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200">
              <FaFacebook className="w-5 h-5 mr-2 text-blue-600" />
              Continue with Facebook
            </button>

            {/* Apple */}
            <button className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200">
              <FaApple className="w-5 h-5 mr-2 text-black" />
              Continue with Apple
            </button>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
