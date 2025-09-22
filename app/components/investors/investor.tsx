"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { RichTextBlock, RichTextChild, MediaItem } from "../../types/strapi";

// ✅ Types
interface InvestorsHeading {
  heading1: string;
  heading2: string;
  description: string | RichTextBlock[];
}

interface Investor {
  author_name: string;
  author_info: string | RichTextBlock[];
  linkedIn_url: string;
  profile?: MediaItem;
}

interface InvestorsData {
  investorsheading: InvestorsHeading[];
  investor: Investor[];
  error?: string;
}

// ✅ Helper function to safely extract Strapi rich-text or string
function formatRichText(content: string | RichTextBlock[]): string {
  if (typeof content === "string") return content;

  if (Array.isArray(content)) {
    return content
      .map((block: RichTextBlock) => {
        if (typeof block === "string") return block;
        if (block.children) {
          return block.children.map((child: RichTextChild) => child.text || "").join(" ");
        }
        return "";
      })
      .join(" ");
  }

  return "";
}

// ✅ Helper for image URLs
function getStrapiMediaUrl(url?: string): string | undefined {
  if (!url) return undefined;

  // Prepend Strapi base URL if relative
  if (url.startsWith("/")) {
    return `${
      process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337"
    }${url}`;
  }
  return url; // Already absolute
}

const PropellusInvestors = () => {
  const [investorsData, setInvestorsData] = useState<InvestorsData | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestorsData = async () => {
      try {
        const response = await fetch("/api/investors-data");
        const data = await response.json();
        console.log("Investors data received:", data);

        if (data.error) {
          console.warn("Error fetching investors data:", data.error);
          setInvestorsData({
            investorsheading: [
              {
                heading1: "OUR INVESTORS",
                heading2:
                  "$150,000 Raised in First Angel Round Backed by a Diverse Group of Investors",
                description:
                  "Propellus has secured a strategic investment of $150,000 to accelerate our development. This diverse group includes seasoned investors, successful founders, and domain experts who are passionate about and understand the problems we are solving.",
              },
            ],
            investor: [],
          });
        } else {
          setInvestorsData(data);
        }
      } catch (error) {
        console.error("Error fetching investors data:", error);
        setInvestorsData({
          investorsheading: [
            {
              heading1: "OUR INVESTORS",
              heading2:
                "$150,000 Raised in First Angel Round Backed by a Diverse Group of Investors",
              description:
                "Propellus has secured a strategic investment of $150,000 to accelerate our development. This diverse group includes seasoned investors, successful founders, and domain experts who are passionate about and understand the problems we are solving.",
            },
          ],
          investor: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInvestorsData();
  }, []);

  const defaultImages = [
    "/images/Framee1.png",
    "/images/Frame 2147225287 (1).png",
    "/images/Frame 2147225287 (2).png",
    "/images/Frame 2147225287 (3).png",
    "/images/Frame 2147225287 (4).png",
    "/images/Frame 2147225287 (5).png",
    "/images/Frame 2147225287 (6).png",
    "/images/Frame 2147225287 (7).png",
    "/images/Frame 2147225287 (8).png",
  ];

  if (loading) {
    return (
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">Loading investors data...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!investorsData) return null;

  return (
    <div className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        {investorsData.investorsheading.length > 0 && (
          <div className="mb-12 text-left w-[800px] ml-6">
            <p className="text-gray-600 text-sm font-medium uppercase tracking-wider mb-2">
              {formatRichText(investorsData.investorsheading[0].heading1)}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {formatRichText(investorsData.investorsheading[0].heading2)}
            </h2>
            <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
              {formatRichText(investorsData.investorsheading[0].description)}
            </p>
          </div>
        )}

        {/* Investors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {investorsData.investor.map((inv, index) => {
            const imgUrl =
              getStrapiMediaUrl(inv.profile?.formats?.small?.url) ||
              getStrapiMediaUrl(inv.profile?.url) ||
              defaultImages[index] ||
              "/images/Frame 2147225287 (1).png";

            return (
              <div key={index} className="text-center">
                <div className="mb-2">
                  <Image
                    src={imgUrl}
                    alt={inv.profile?.alternativeText || inv.author_name}
                    width={300}
                    height={300}
                    className="w-64 h-64 mx-auto object-cover shadow-md" // ✅ square frame
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {inv.author_name}
                </h3>
                <p className="text-sm text-gray-600">
                  {formatRichText(inv.author_info)}
                </p>
                {inv.linkedIn_url && (
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Image
                      src="/images/linkedin.png"
                      alt="LinkedIn"
                      width={18}
                      height={18}
                    />
                    <a
                      href={inv.linkedIn_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PropellusInvestors;
