"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Types for the visa process data
interface VisaProcess {
  heading1: string;
  description: string;
  image?: {
    url: string;
    alternativeText?: string;
  };
}

interface TravelAgentData {
  visaprocess?: VisaProcess;
  error?: string;
}

const VisaProcessingSection = () => {
  const [visaProcessData, setVisaProcessData] = useState<VisaProcess | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisaProcessData = async () => {
      try {
        console.log('Fetching visa process data from /api/travelagents...');
        const response = await fetch('/api/travelagents');

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data: TravelAgentData = await response.json();
        console.log('Received visa process data from API:', data);
        
        if (data.error) {
          console.warn('Strapi connection failed for visa process:', data.error);
          setVisaProcessData({
            heading1: "Automate, Scale, and Enhance visa processing with Propellus",
            description: "A fully automated online shopfront driving 2x growth in new customers to your website with dynamic SEO, beautifully showcasing your services, displaying visa requirements, and enabling visa applications in just a few clicks!",
          });
        } else if (data.visaprocess) {
          setVisaProcessData(data.visaprocess);
        } else {
          setVisaProcessData({
            heading1: "Automate, Scale, and Enhance visa processing with Propellus",
            description: "A fully automated online shopfront driving 2x growth in new customers to your website with dynamic SEO, beautifully showcasing your services, displaying visa requirements, and enabling visa applications in just a few clicks!",
          });
        }
      } catch (err) {
        console.error('Error fetching visa process data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setVisaProcessData({
          heading1: "Automate, Scale, and Enhance visa processing with Propellus",
          description: "A fully automated online shopfront driving 2x growth in new customers to your website with dynamic SEO, beautifully showcasing your services, displaying visa requirements, and enabling visa applications in just a few clicks!",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchVisaProcessData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500 text-lg">Loading visa processing data...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-900 mb-8">
            {visaProcessData?.heading1 || "Automate, Scale, and Enhance visa processing with Propellus"}
          </h2>
          
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {visaProcessData?.description || 
              "A fully automated online shopfront driving 2x growth in new customers to your website with dynamic SEO, beautifully showcasing your services, displaying visa requirements, and enabling visa applications in just a few clicks!"}
          </p>

          {error && (
            <p className="text-red-500 text-sm mt-2">
              Error loading content: {error}
            </p>
          )}
        </div>

        {/* Image Section */}
        <div className="flex justify-center">
          <Image
            src={
              visaProcessData?.image?.url
                ? `${
                    process.env.NEXT_PUBLIC_STRAPI_URL ||
                    "http://127.0.0.1:1337"
                  }${visaProcessData.image.url}`
                : "/new.png"
            }
            alt={
              visaProcessData?.image?.alternativeText ||
              "TravelAgents Dashboard Interface"
            }
            width={1200}
            height={800}
            className="w-full max-w-8xl object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default VisaProcessingSection;