"use client";
import React, { useState, useEffect } from "react";
import { ShieldCheck, Workflow, Zap, Users, Database, Lock, Layers, Clock, Scale, CreditCard, Scan } from "lucide-react";

interface Benefits {
  Heading: string;
  subheading1: string;
  subdescription1: string;
  subheading2: string;
  subdescription2: string;
  subheading3: string;
  subdescription3: string;
}

interface Heading {
  mainheading: string;
}

interface FeatureSection {
  heading: string;
  description: string;
}

interface TravelAgentData {
  benefits: Benefits;
  heading: Heading;
  featureSection: FeatureSection[];
}

const BenefitsFeatures = () => {
  const [data, setData] = useState<TravelAgentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/travelagents');
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const fetchedData: TravelAgentData = await response.json();
        setData(fetchedData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="bg-white py-16 px-6">Loading...</div>;
  }

  // Fallback to hardcoded data if API fails or data is missing
  const benefitsHeading = data?.benefits?.Heading || "Key Benefits for Travel Agents";
  const featuresHeading = data?.heading?.mainheading || "A feature-rich visa platform";

  const benefits = [
    {
      icon: <Workflow className="w-6 h-6 text-cyan-600" />,
      title: data?.benefits?.subheading1 || "Efficient Workload Management",
      description: data?.benefits?.subdescription1 || "Reduces the workload on both agents and customers, ensuring that issues are resolved faster with minimal human intervention.",
      color: "bg-cyan-50 border-cyan-200",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      title: data?.benefits?.subheading2 || "Transparency and Trust",
      description: data?.benefits?.subdescription2 || "Enhance transparency and trust, reducing confusion and delays due to manual follow-ups.",
      color: "bg-blue-50 border-blue-200",
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-600" />,
      title: data?.benefits?.subheading3 || "Streamlined Application Process",
      description: data?.benefits?.subdescription3 || "Minimizes customer mistakes and agent rework, speeding up the application process.",
      color: "bg-yellow-50 border-yellow-200",
    },
  ];

  const features = [
    { icon: <Users />, title: data?.featureSection?.[0]?.heading || "Branded online shop front", description: data?.featureSection?.[0]?.description || "A self-managed online shop allows customers to view visa requirements and seamlessly apply for visas through an intuitive platform." },
    { icon: <Database />, title: data?.featureSection?.[1]?.heading || "AI Powered Data Extraction / OCR", description: data?.featureSection?.[1]?.description || "Easily gather visa documents by using AI-driven OCR for precise data extraction and cross-validate information across multiple documents." },
    { icon: <Lock />, title: data?.featureSection?.[2]?.heading || "Smart Data Locker", description: data?.featureSection?.[2]?.description || "Manage all travel documents in one place, reuse them for future visa applications, and maintain your visa and travel history efficiently." },
    { icon: <Layers />, title: data?.featureSection?.[3]?.heading || "Unified Ecosystem", description: data?.featureSection?.[3]?.description || "Keep travelers, travel agencies, and visa suppliers connected on one platform, streamlining the visa process for fast, efficient approval in just a few clicks." },
    { icon: <Clock />, title: data?.featureSection?.[4]?.heading || "Visa History", description: data?.featureSection?.[4]?.description || "Keep travelers, travel agencies, and visa suppliers connected on one platform, streamlining the visa process with just a few clicks." },
    { icon: <Scale />, title: data?.featureSection?.[5]?.heading || "GDPR Compliance", description: data?.featureSection?.[5]?.description || "Keep travelers, travel agencies, and visa suppliers connected on one platform, streamlining the visa process with just a few clicks." },
    { icon: <CreditCard />, title: data?.featureSection?.[6]?.heading || "Multiple Payment Gateway", description: data?.featureSection?.[6]?.description || "Keep travelers, travel agencies, and visa suppliers connected on one platform, streamlining the visa process with just a few clicks." },
    { icon: <Scan />, title: data?.featureSection?.[7]?.heading || "AI Scanner", description: data?.featureSection?.[7]?.description || "Keep travelers, travel agencies, and visa suppliers connected on one platform, streamlining the visa process with just a few clicks." },
  ];

  return (
    <div className="bg-white py-16 px-6 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Benefits */}
        <div className="mb-20">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
            Benefits
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
            {benefitsHeading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className={`rounded-xl border p-6 flex flex-col space-y-3 ${benefit.color}`}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white shadow">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4 text-center">
            Features
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            {featuresHeading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 hover:shadow-md transition"
              >
                <div className="w-10 h-10 mb-4 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsFeatures;
