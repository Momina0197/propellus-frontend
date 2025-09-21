"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Types for the approach data based on your Strapi structure
interface Approach {
  title1: string;
  title2: string;
  description: string;
  image1?: {
    url: string;
    alternativeText?: string;
  };
  image2?: {
    url: string;
    alternativeText?: string;
  };
  image3?: {
    url: string;
    alternativeText?: string;
  };
}

interface InvestorsData {
  approach: Approach;
}

const PropellusApproach = () => {
  const [approachData, setApproachData] = useState<Approach | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApproachData = async () => {
      try {
        const response = await fetch("/api/investors-data");
        const data: InvestorsData = await response.json();
        console.log("Approach data received:", data);

        // Check if we got an error response from the API
        if (data.error) {
          console.warn("Strapi connection failed for approach:", data.error);
          console.warn("Using fallback approach data");
          setApproachData({
            title1: "OUR APPROACH",
            title2: "Building Propellus with Our Customers, for Our Customers",
            description:
              "With a revenue-sharing agreement with cornerstone client Prince Visa in the UK market and a strategic MOU with global OTAs Wego and GoZayaan, Propellus is collaborating with experts from the travel industry to ensure we address all customer pain points on our platform.",
          });
        } else if (data.approach) {
          console.log("Using Strapi approach data");
          setApproachData(data.approach);
        } else {
          console.warn("No approach data found in Strapi, using fallback");
          setApproachData({
            title1: "OUR APPROACH",
            title2: "Building Propellus with Our Customers, for Our Customers",
            description:
              "With a revenue-sharing agreement with cornerstone client Prince Visa in the UK market and a strategic MOU with global OTAs Wego and GoZayaan, Propellus is collaborating with experts from the travel industry to ensure we address all customer pain points on our platform.",
          });
        }
      } catch (error) {
        console.error("Error fetching approach data:", error);
        setApproachData({
          title1: "OUR APPROACH",
          title2: "Building Propellus with Our Customers, for Our Customers",
          description:
            "With a revenue-sharing agreement with cornerstone client Prince Visa in the UK market and a strategic MOU with global OTAs Wego and GoZayaan, Propellus is collaborating with experts from the travel industry to ensure we address all customer pain points on our platform.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchApproachData();
  }, []);

  if (loading) {
    return (
      <div
        className="relative py-2 px-1 overflow-hidden"
        style={{ backgroundColor: "#1C3F5D" }}
      >
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-white">Loading approach data...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative py-2 px-1 overflow-hidden"
      style={{ backgroundColor: "#1C3F5D" }}
    >
      {/* Background Images */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/top_glow.svg"
          alt="Background decoration top"
          width={500}
          height={500}
          className="absolute -top-12 left-0 rotate-180"
        />
        <Image
          src="/bottom_glow.svg"
          alt="Background decoration bottom"
          width={400}
          height={400}
          className="absolute -bottom-12 right-0 rotate-180"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6 pt-12">
          <p className="text-white text-sm font-medium tracking-wider uppercase mb-2">
            {approachData?.title1 || "OUR APPROACH"}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3 max-w-5xl mx-auto whitespace-nowrap">
            {approachData?.title2 || "Building Propellus with Our Customers, for Our Customers"}
          </h2>
          <p className="text-white text-base lg:text-lg max-w-5xl mx-auto leading-relaxed">
            {approachData?.description ||
              "With a revenue-sharing agreement with cornerstone client Prince Visa in the UK market and a strategic MOU with global OTAs Wego and GoZayaan, Propellus is collaborating with experts from the travel industry to ensure we address all customer pain points on our platform."}
          </p>
        </div>

        {/* Images Section */}
        <div className="relative w-[1266px] h-[800px] mx-auto mt-2">
          {/* Left Image (Main Image - using image1) */}
          <div className="absolute top-[120px] left-0 w-[800px] h-[534px] rounded-[24px] overflow-hidden shadow-lg bg-white">
            <Image
              src={
                approachData?.image1?.url
                  ? `${
                      process.env.NEXT_PUBLIC_STRAPI_URL ||
                      "http://127.0.0.1:1337"
                    }${approachData.image1.url}`
                  : "/images/frame in1.png"
              }
              alt={
                approachData?.image1?.alternativeText ||
                "Prince Visa partnership"
              }
              fill
              className="object-cover rounded-[24px]"
            />
            {/* Logos on top of the left image - keeping original static logos for now */}
            <div className="absolute inset-0 flex items-center justify-center -translate-y-52 space-x-18">
              <Image
                src="/images/logo 2.png"
                alt="Propellus logo"
                width={48}
                height={48}
                className="h-12 w-auto"
              />
              <Image
                src="/images/propellus logo 1.png"
                alt="Other logo"
                width={48}
                height={48}
                className="h-12 w-auto"
              />
            </div>
          </div>

          {/* Upper Right Image (using image2) */}
          <div className="absolute top-[120px] left-[832px] w-[434px] h-[255px] rounded-[24px] overflow-hidden shadow-lg bg-white">
            <Image
              src={
                approachData?.image2?.url
                  ? `${
                      process.env.NEXT_PUBLIC_STRAPI_URL ||
                      "http://127.0.0.1:1337"
                    }${approachData.image2.url}`
                  : "/images/frame in2.png"
              }
              alt={
                approachData?.image2?.alternativeText ||
                "Wego partnership"
              }
              fill
              className="object-cover rounded-[24px]"
            />
          </div>

          {/* Lower Right Image (using image3) */}
          <div className="absolute top-[399px] left-[832px] w-[434px] h-[255px] rounded-[24px] overflow-hidden shadow-lg bg-white">
            <Image
              src={
                approachData?.image3?.url
                  ? `${
                      process.env.NEXT_PUBLIC_STRAPI_URL ||
                      "http://127.0.0.1:1337"
                    }${approachData.image3.url}`
                  : "/images/frame in3.png"
              }
              alt={
                approachData?.image3?.alternativeText ||
                "Team collaboration"
              }
              fill
              className="object-cover rounded-[24px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropellusApproach;