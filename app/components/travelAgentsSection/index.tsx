"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { LandingPageData } from "../../types/strapi";

const TravelBusinessSections = () => {
  const [landingData, setLandingData] = useState<LandingPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLandingData = async () => {
      try {
        const response = await fetch("/api/strapi-data");
        const data: LandingPageData = await response.json();
        console.log(
          "Landing page data received in TravelBusinessSections:",
          data
        );

        // Check if we got an error response from the API
        if (data.error) {
          console.warn("Strapi connection failed:", data.error);
          console.warn("Using fallback data for travel sections");
          setLandingData(null); // This will trigger fallback content in the render
        } else {
          console.log("Using Strapi data for travel sections");
          setLandingData(data);
        }
      } catch (error) {
        console.error("Error fetching landing page data:", error);
        setLandingData(null); // This will trigger fallback content in the render
      } finally {
        setLoading(false);
      }
    };

    fetchLandingData();
  }, []);

  const renderBulletPoints = (bulletPoints?: { text: string }[]) => {
    if (!bulletPoints || bulletPoints.length === 0) {
      return (
        <>
          <div className="flex items-start space-x-3">
            <div className="w-1 h-1 bg-[#6A6A6A] rounded-full mt-2"></div>
            <p className="text-gray-600">
              Boost customer satisfaction with automated visa applications
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-1 h-1 bg-[#6A6A6A] rounded-full mt-2"></div>
            <p className="text-gray-600">
              Automated visa application with AI-powered OCR
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-1 h-1 bg-[#6A6A6A] rounded-full mt-2"></div>
            <p className="text-gray-600">
              Online shop front for a seamless user experience
            </p>
          </div>
        </>
      );
    }

    return bulletPoints.map((point, index) => (
      <div key={index} className="flex items-start space-x-3">
        <div className="w-1 h-1 bg-[#6A6A6A] rounded-full mt-2"></div>
        <p className="text-gray-600">{point.text}</p>
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="bg-gray-50 py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-full mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">Loading sections...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-full mx-auto space-y-16">
        {/* Travel Agents Section */}
        <div className="overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Content Side */}
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
                FOR TRAVEL AGENTS
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {landingData?.travelAgents?.heading ||
                  "Grow your travel business with AI powered automation"}
              </h2>

              <div className="space-y-4 mb-8">
                {renderBulletPoints(landingData?.travelAgents?.bulletPoints)}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                  Start for free
                </button>
                <Link
                  href="/learn-more"
                  className="border border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
                >
                  Learn more
                </Link>
              </div>
            </div>

            {/* Image Side */}
            <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-[500px]">
              <Image
                src={
                  landingData?.travelAgents?.image?.[0]?.url
                    ? `${
                        process.env.NEXT_PUBLIC_STRAPI_URL ||
                        "http://127.0.0.1:1337"
                      }${landingData.travelAgents.image[0].url}`
                    : "/images/image1.png"
                }
                alt={
                  landingData?.travelAgents?.image?.[0]?.alternativeText ||
                  "Travel Agent Dashboard Interface"
                }
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* OTAs Section */}
        <div className="overflow-hidden">
          <div className="flex flex-col lg:flex-row-reverse">
            {/* Content Side */}
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
                FOR OTAS
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {landingData?.otas?.heading ||
                  "Offer one-window travel & visa services within your OTA platform"}
              </h2>

              <div className="space-y-4 mb-8">
                {landingData?.otas?.bulletPoints &&
                landingData.otas.bulletPoints.length > 0 ? (
                  renderBulletPoints(landingData.otas.bulletPoints)
                ) : (
                  <>
                    <div className="flex items-start space-x-3">
                      <div className="w-1 h-1 bg-[#6A6A6A] rounded-full mt-2"></div>
                      <p className="text-gray-600">
                        Seamlessly integrate and offer automated visa processing
                        services to your customers from beginning to the end
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-1 h-1 bg-[#6A6A6A] rounded-full mt-2"></div>
                      <p className="text-gray-600">
                        Use for OTA partners is competitive speed
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-1 h-1 bg-[#6A6A6A] rounded-full mt-2"></div>
                      <p className="text-gray-600">
                        User service access with visa processing
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-1 h-1 bg-[#6A6A6A] rounded-full mt-2"></div>
                      <p className="text-gray-600">
                        Complete automated workflow and instant document
                        processing
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                  Register Interest
                </button>
              </div>
            </div>

            {/* Image Side */}
            <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-[500px]">
              <Image
                src={
                  landingData?.otas?.image?.[0]?.url
                    ? `${
                        process.env.NEXT_PUBLIC_STRAPI_URL ||
                        "http://127.0.0.1:1337"
                      }${landingData.otas.image[0].url}`
                    : "/images/image2.png"
                }
                alt={
                  landingData?.otas?.image?.[0]?.alternativeText ||
                  "OTA Platform Integration Interface"
                }
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelBusinessSections;
