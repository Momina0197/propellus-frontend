"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

// Define types for dropdown state
type DropdownType = "destination" | "residency" | "nationality";
interface DropdownState {
  isOpen: boolean;
  selected: string;
}

// Define interface for CustomDropdown props
interface CustomDropdownProps {
  label: string;
  type: DropdownType;
  options: string[];
  value: string;
}

interface HerosectionData {
  heading1: string;
  heading2: string;
}

const HeroSection = () => {
  const [herosection, setHerosection] = useState<HerosectionData | null>(null);

  // State with explicit type
  const [dropdowns, setDropdowns] = useState<
    Record<DropdownType, DropdownState>
  >({
    destination: { isOpen: false, selected: "Please Select" },
    residency: { isOpen: false, selected: "United Kingdom" },
    nationality: { isOpen: false, selected: "Indian" },
  });

  const destinationOptions = [
    "Please Select",
    "United Arab Emirates",
    "Saudi Arabia",
    "Qatar",
    "Kuwait",
    "Bahrain",
    "Oman",
  ];

  const residencyOptions = [
    "United Kingdom",
    "United States",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Netherlands",
    "Switzerland",
    "Singapore",
    "Japan",
  ];

  const nationalityOptions = [
    "Indian",
    "Pakistani",
    "Bangladeshi",
    "Sri Lankan",
    "British",
    "American",
    "Canadian",
    "Australian",
    "German",
    "French",
  ];

  useEffect(() => {
    const fetchHerosection = async () => {
      try {
        const response = await fetch("/api/strapi-data");
        const data = await response.json();
        if (data.herosection) {
          setHerosection(data.herosection);
        }
      } catch (error) {
        console.error("Error fetching herosection data:", error);
      }
    };

    fetchHerosection();
  }, []);

  // Toggle dropdown with typed parameter
  const toggleDropdown = (type: DropdownType) => {
    setDropdowns((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        isOpen: !prev[type].isOpen,
      },
    }));
  };

  // Select option with typed parameters
  const selectOption = (type: DropdownType, value: string) => {
    setDropdowns((prev) => ({
      ...prev,
      [type]: {
        selected: value,
        isOpen: false,
      },
    }));
  };

  // CustomDropdown component with typed props
  const CustomDropdown: React.FC<CustomDropdownProps> = ({
    label,
    type,
    options,
    value,
  }) => (
    <div className="space-y-2 border-r-[1px] broder-gray-200 relative">
      <label className="text-lg text-black font-medium">{label}</label>
      <div className="relative">
        <button
          onClick={() => toggleDropdown(type)}
          className={`w-full p-3 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
            value === "Please Select" ? "text-gray-500" : "text-gray-700"
          }`}
        >
          {value}
        </button>
        <ChevronDown
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-transform duration-200 ${
            dropdowns[type].isOpen ? "rotate-180" : ""
          }`}
          size={20}
        />

        {dropdowns[type].isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-600 rounded-md shadow-xl z-50 max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => selectOption(type, option)}
                className={`w-full px-4 py-3 text-left hover:bg-teal-600 transition-colors duration-150 ${
                  option === value
                    ? "bg-teal-600 text-white"
                    : "text-gray-100 hover:text-white"
                } ${index === 0 ? "rounded-t-md" : ""} ${
                  index === options.length - 1 ? "rounded-b-md" : ""
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-r from-[#009BA2] to-[#5CE1E6] flex flex-col">
      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Main Heading (heading1 only) */}
        <div className="text-center mb-12">
          <h1 className="text-white text-[28px] md:text-[30px] lg:text-[40px] font-normal leading-tight">
            {herosection?.heading1 || "UAE Visa application for"}
          </h1>
        </div>

        {/* Search Form */}
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-3 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <CustomDropdown
              label="Destination"
              type="destination"
              options={destinationOptions}
              value={dropdowns.destination.selected}
            />
            <CustomDropdown
              label="Residency"
              type="residency"
              options={residencyOptions}
              value={dropdowns.residency.selected}
            />
            <CustomDropdown
              label="Nationality"
              type="nationality"
              options={nationalityOptions}
              value={dropdowns.nationality.selected}
            />
            {/* Search Button */}
            <div className="mt-6 flex justify-end">
              <button className="bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 px-8 rounded-md transition-colors duration-200">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="text-center">
          {/* Heading2 from API replaces hardcoded text */}
          <h2 className="text-black text-[20px] md:text-[28px] font-medium mb-8">
            {herosection?.heading2 || "Trusted by Leading Travel Agencies"}
          </h2>

          <div className="flex flex-wrap justify-center items-center">
            <Image
              src={"/logos.svg"}
              alt="Partner Logos"
              width={120}
              height={40}
              className="object-contain w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
