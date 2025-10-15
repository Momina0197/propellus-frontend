"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FileText, Database, Frown, Upload, Bot, Globe } from "lucide-react";
import { MediaItem } from "../../types/strapi";

interface TravelAgentProblem {
  heading: string;
  subheading1: string;
  description1: string;
  subheading2: string;
  description2: string;
  subheading3: string;
  description3: string;
  image?: MediaItem;
}

interface Solution {
  heading: string;
  subheading1: string;
  description1: string;
  subheading2: string;
  description2: string;
  subheading3: string;
  description3: string;
  image?: MediaItem;
}

interface TravelAgentData {
  travelagentproblem: TravelAgentProblem;
  solution: Solution;
}

const ProblemSolutionSection = () => {
  const [data, setData] = useState<TravelAgentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/travelagents');
        if (!response.ok) {
          throw new Error('Failed to fetch travel agent data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to get image URL from Strapi data
  const getImageUrl = (imageData: MediaItem | undefined) => {
    if (!imageData) return null;

    // Handle different possible structures from Strapi
    if (imageData.url) {
      // If URL starts with /, prepend the Strapi base URL
      if (imageData.url.startsWith('/')) {
        return `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337'}${imageData.url}`;
      }
      return imageData.url;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto flex justify-center items-center h-64">
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto flex justify-center items-center h-64">
          <div className="text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  const problemData = data?.travelagentproblem;
  const solutionData = data?.solution;

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Problem Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Problem Content */}
            <div className="order-2 lg:order-1">
              <div className="mb-6">
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  PROBLEM
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                {problemData?.heading || "Old, manual, error-prone system"}
              </h2>

              <div className="space-y-6">
                {/* Problem Item 1 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {problemData?.subheading1 || "Document Collection"}
                    </h3>
                    <p className="text-gray-600">
                      {problemData?.description1 || "Challenges in efficiently gathering required documents for each applicant"}
                    </p>
                  </div>
                </div>

                {/* Problem Item 2 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {problemData?.subheading2 || "Data Extraction and Validation"}
                    </h3>
                    <p className="text-gray-600">
                      {problemData?.description2 || "Manual data extraction and validation processes are time-consuming and prone to errors"}
                    </p>
                  </div>
                </div>

                {/* Problem Item 3 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Frown className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {problemData?.subheading3 || "Poor Customer Experience"}
                    </h3>
                    <p className="text-gray-600">
                      {problemData?.description3 || "Negative online experiences lead to decreased customer satisfaction"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Problem Image */}
            <div className="order-1 lg:order-2 flex justify-center">
              <Image
                src={getImageUrl(problemData?.image) || "/images/middleimage1.png"}
                alt="Manual visa processing problems"
                width={600}
                height={490}
                className="w-full !max-w-[600px] max-h-[490px] h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Solution Section */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Solution Image */}
            <div className="order-1 flex justify-center">
              <Image
                src={getImageUrl(solutionData?.image) || "/images/middleimage2.png"}
                alt="Automated visa processing with AI"
                width={600}
                height={490}
                className="w-full !max-w-[600px] rounded-[30px] max-h-[490px] h-full object-contain"
              />
            </div>

            {/* Solution Content */}
            <div className="order-2">
              <div className="mb-6">
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  SOLUTION
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                {solutionData?.heading || "Automated visa processing with AI"}
              </h2>

              <div className="space-y-6">
                {/* Solution Item 1 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Upload className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {solutionData?.subheading1 || "Direct customer document uploads"}
                    </h3>
                    {solutionData?.description1 && (
                      <p className="text-gray-600">
                        {solutionData.description1}
                      </p>
                    )}
                  </div>
                </div>

                {/* Solution Item 2 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {solutionData?.subheading2 || "Automated visa application with AI-powered OCR."}
                    </h3>
                    {solutionData?.description2 && (
                      <p className="text-gray-600">
                        {solutionData.description2}
                      </p>
                    )}
                  </div>
                </div>

                {/* Solution Item 3 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {solutionData?.subheading3 || "Offer a Free Online Shopfront for a"}
                    </h3>
                    <p className="text-gray-600">
                      {solutionData?.description3 || "Seamless Customer Experience"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolutionSection;