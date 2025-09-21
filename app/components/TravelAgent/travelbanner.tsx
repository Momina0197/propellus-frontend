"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface Hero {
  heading1: string;
  heading2: string;
}

interface TravelAgentData {
  hero: Hero;
}

const HeroSection = () => {
  const [heroData, setHeroData] = useState<Hero>({
    heading1: "Visa Application Solution For Travel Agents in London",
    heading2: "TRUSTED BY LEADING TRAVEL AGENCIES"
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        console.log('Fetching hero data from /api/travelagents...');
        const response = await fetch('/api/travelagents');

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data: TravelAgentData = await response.json();
        console.log('Received data from API:', data);
        setHeroData(data.hero);
        console.log('Hero data set:', data.hero);
      } catch (err) {
        console.error('Error fetching hero data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        // Keep default values on error
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#009BA2] to-[#5CE1E6] flex flex-col">
      {/* Blue Navigation Bar */}
      <div className="bg-slate-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <h2 className="text-lg font-medium">Travel Agents</h2>
            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-white hover:text-gray-200 font-medium"
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-200 font-medium"
              >
                View Live Demo
              </a>
              <button className="bg-white text-slate-700 px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        {/* Main Heading - Using only heading1 */}
        <div className="text-center mb-12">
          {loading ? (
            <div className="text-white text-[32px] md:text-[60px] lg:text-[64px] font-bold leading-tight animate-pulse">
              Loading...
            </div>
          ) : (
            <h1 className="text-white text-[32px] max-w-[900px] md:text-[60px] lg:text-[64px] font-bold leading-tight">
              {heroData.heading1}
            </h1>
          )}
          {error && (
            <p className="text-red-200 text-sm mt-2">
              Error loading content: {error}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <button className="bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 px-8 rounded-md transition-colors duration-200">
            Request a Call
          </button>
          <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-600 font-semibold py-3 px-8 rounded-md transition-colors duration-200">
            View Live Demo
          </button>
        </div>

        {/* Trusted By Section - Using heading2 */}
        <div className="text-center">
          <h2 className="text-black text-[18px] md:text-[24px] font-normal mb-8 tracking-wide">
            {heroData.heading2}
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-80">
            <div className="flex flex-wrap justify-center items-center">
              <Image
                src={"/logos.svg"}
                alt="Logo 1"
                width={120}
                height={40}
                className="object-contain w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;