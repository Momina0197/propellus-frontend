"use client";
import React, { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b relative z-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex space-x-12 items-center">
              <Link href={"/"}>
                {" "}
                <Image
                  src={"logo.svg"}
                  alt="Propellus Logo"
                  width={120}
                  height={50}
                />
              </Link>
              {/* Desktop Navigation Links - Hidden on mobile */}
              <div className="hidden lg:flex items-center space-x-8">
                <Link
                  href="/investors"
                  className="text-[#1C3F5D] hover:text-[#1C3F5D] font-medium"
                >
                  Investors
                </Link>
                <Link
                  href="/travel-agents"
                  className="text-[#1C3F5D] hover:text-[#1C3F5D] font-medium"
                >
                  Travel Agents
                </Link>
                <Link
                  href="/otas"
                  className="text-[#1C3F5D] hover:text-[#1C3F5D] font-medium"
                >
                  OTAs
                </Link>
              </div>
            </div>

            {/* Desktop Right Side - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="flex items-center text-[#1C3F5D] hover:text-[#1C3F5D]">
                <span>Help</span>
                <ChevronDown size={16} className="ml-1" />
              </button>
              <Link
                href="/login"
                className="text-[#1C3F5D] font-medium px-3 py-2"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-white border border-[#1C3F5D] text-[#1C3F5D] px-4 py-2 rounded-md hover:bg-gray-50 font-medium"
              >
                Sign up
              </Link>
            </div>

            {/* Mobile menu button - Visible on mobile only */}
            <div className="lg:hidden">
              <button
                onClick={toggleDrawer}
                className="text-[#1C3F5D] p-2 rounded-md hover:bg-gray-100"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-2xl bg-opacity-50 z-40 lg:hidden"
          onClick={closeDrawer}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <Image
            src={"logo.svg"}
            alt="Propellus Logo"
            width={120}
            height={50}
          />
          <button
            onClick={closeDrawer}
            className="text-[#1C3F5D] p-2 rounded-md hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-4">
          {/* Navigation Links */}
          <div className="space-y-4 mb-8">
            <Link
              href="/"
              className="block text-[#1C3F5D] hover:text-[#1C3F5D] font-medium py-2"
              onClick={closeDrawer}
            >
              Travellers
            </Link>
            <Link
              href="/TravelAgents"
              className="block text-[#1C3F5D] hover:text-[#1C3F5D] font-medium py-2"
              onClick={closeDrawer}
            >
              Travel Agents
            </Link>
            <Link
              href="#"
              className="block text-[#1C3F5D] hover:text-[#1C3F5D] font-medium py-2"
              onClick={closeDrawer}
            >
              OTAs
            </Link>
          </div>
          {/* Help Button */}
          <div className="mb-6">
            <button className="flex items-center text-[#1C3F5D] hover:text-[#1C3F5D] w-full py-2">
              <span>Help</span>
              <ChevronDown size={16} className="ml-1" />
            </button>
          </div>

          {/* Auth Links */}
          <div className="space-y-3">
            <Link
              href="/login"
              className="block text-[#1C3F5D] font-medium py-2"
              onClick={closeDrawer}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="block bg-white border border-[#1C3F5D] text-[#1C3F5D] px-4 py-2 rounded-md hover:bg-gray-50 font-medium text-center"
              onClick={closeDrawer}
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
        </>
  );
};

export default Navbar;
