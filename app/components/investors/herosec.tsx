 "use client";

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { Poppins } from 'next/font/google';

// ✅ Import Poppins
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'], // pick weights you need
});

// Types for the investors hero data
interface InvestorsHero {
  heading: string;
  description: string;
  image?: {
    url: string;
    alternativeText?: string;
  };
}

interface InvestorsData {
  investorsHero: InvestorsHero;
}

const PropellusProblem = () => {
  const [heroData, setHeroData] = useState<InvestorsHero | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch("/api/investors-data");
        const data: InvestorsData = await response.json();
        console.log("Hero data received:", data);

        // Check if we got an error response from the API
        if (data.error) {
          console.warn("Strapi connection failed for investors hero:", data.error);
          console.warn("Using fallback hero data");
          setHeroData({
            heading: "Solving the $7.2 Billion Problem",
            description: "Each year, 300 million people require a visa to travel.\nWe call them weak passport holders.\nWhile most travel-tech companies are focused on\nhotels and tickets, Propellus is building an ecosystem\nwhere travellers, travel agents, OTAs, embassies, and\nthe travel industry can integrate and serve travellers\nfrom emerging markets like India, China, South East Asia,\nAfrica, and South America.\nThat's a 7.2 billion dollar opportunity!"
          });
        } else if (data.investorsHero) {
          console.log("Using Strapi hero data");
          setHeroData(data.investorsHero);
        } else {
          console.warn("No hero data found in Strapi, using fallback");
          setHeroData({
            heading: "Solving the $7.2 Billion Problem",
            description: "Each year, 300 million people require a visa to travel.\nWe call them weak passport holders.\nWhile most travel-tech companies are focused on\nhotels and tickets, Propellus is building an ecosystem\nwhere travellers, travel agents, OTAs, embassies, and\nthe travel industry can integrate and serve travellers\nfrom emerging markets like India, China, South East Asia,\nAfrica, and South America.\nThat's a 7.2 billion dollar opportunity!"
          });
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
        setHeroData({
          heading: "Solving the $7.2 Billion Problem",
          description: "Each year, 300 million people require a visa to travel.\nWe call them weak passport holders.\nWhile most travel-tech companies are focused on\nhotels and tickets, Propellus is building an ecosystem\nwhere travellers, travel agents, OTAs, embassies, and\nthe travel industry can integrate and serve travellers\nfrom emerging markets like India, China, South East Asia,\nAfrica, and South America.\nThat's a 7.2 billion dollar opportunity!"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white py-16 px-8 lg:px-12" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-900">Loading hero data...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-16 px-8 lg:px-12" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {heroData?.heading || "Solving the $7.2 Billion Problem"}
            </h2>
            
            {/* ✅ Apply Poppins font here */}
            <div className={`${poppins.className} text-gray-800 text-base lg:text-lg`}>
              <p style={{ whiteSpace: 'pre-line' }}>
                {heroData?.description || "Each year, 300 million people require a visa to travel.\nWe call them weak passport holders.\nWhile most travel-tech companies are focused on\nhotels and tickets, Propellus is building an ecosystem\nwhere travellers, travel agents, OTAs, embassies, and\nthe travel industry can integrate and serve travellers\nfrom emerging markets like India, China, South East Asia,\nAfrica, and South America.\nThat's a 7.2 billion dollar opportunity!"}
              </p>
            </div>
          </div>
           
          {/* Right Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <Image
                src={
                  heroData?.image?.url
                    ? `${
                        process.env.NEXT_PUBLIC_STRAPI_URL ||
                        "http://127.0.0.1:1337"
                      }${heroData.image.url}`
                    : "/images/invertor1.png"
                }
                alt={
                  heroData?.image?.alternativeText ||
                  "Global travel and visa solution illustration"
                }
                width={500}
                height={400}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropellusProblem;