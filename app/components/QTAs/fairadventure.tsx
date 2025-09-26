"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface BulletPoint {
  id: number;
  point: { type: string; children: { text: string }[] }[];
  icon?: { id: number; url: string; name?: string; alternativeText?: string | null; width?: number; height?: number };
}

interface FairSection {
  id: number;
  title: { type: string; children: { text: string }[] }[];
  image?: { id: number; url: string; name?: string; alternativeText?: string | null; width?: number; height?: number; formats?: any };
  bulletPoints: BulletPoint[];
}

interface OtaData {
  id: number;
  fairSection: FairSection;
}

interface ApiResponse {
  success: boolean;
  data: OtaData | null;
  error?: string;
}

export default function FeatureCard() {
  const [otaData, setOtaData] = useState<OtaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch("/api/otas/fairAdventure", { cache: "no-store" });
        const json: ApiResponse = await res.json();

        if (json.success && json.data) setOtaData(json.data);
        else setError(json.error || "Failed to load data");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getTextFromRichText = (richText: { type: string; children: { text: string }[] }[]) =>
    richText?.map(block => block.children.map(child => child.text).join('')).join('') || '';

  if (loading) return (
    <div className="bg-white max-w-[1250px] mx-auto p-4 md:p-6">
      <div className="bg-[#F9F9F9] border border-black/25 rounded-[26px] p-8 text-center animate-pulse">
        Loading feature data...
      </div>
    </div>
  );

  if (error) return (
    <div className="bg-white max-w-[1250px] mx-auto p-4 md:p-6">
      <div className="bg-red-50 border border-red-200 rounded-[26px] p-8 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    </div>
  );

  if (!otaData?.fairSection) return (
    <div className="bg-white max-w-[1250px] mx-auto p-4 md:p-6">
      <div className="bg-[#F9F9F9] border border-black/25 rounded-[26px] p-8 text-center">
        No data available
      </div>
    </div>
  );

  const { fairSection } = otaData;

  return (
    <div className="bg-white max-w-[1250px] mx-auto p-4 md:p-6">
      <div className="bg-[#F9F9F9] border border-black/25 max-w-[1250px] mx-auto rounded-2xl shadow-sm p-6 md:p-9 md:mx-9">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            {fairSection.image?.url && (
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL || ''}${fairSection.image.url}`}
                alt={fairSection.image.alternativeText || fairSection.image.name || "Feature image"}
                width={fairSection.image.width || 650}
                height={fairSection.image.height || 459}
                className="rounded-xl w-full h-auto object-cover"
                priority
              />
            )}
          </div>

          {/* Right Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 leading-snug mb-6">
              {getTextFromRichText(fairSection.title)}
            </h2>
            <div className="flex flex-col gap-6">
              {fairSection.bulletPoints?.map((point) => (
                <div key={point.id} className="flex items-center gap-6">
                  {point.icon?.url && (
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL || ''}${point.icon.url}`}
                        alt={point.icon.alternativeText || point.icon.name || "Bullet point icon"}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                  )}
                  <p className="text-gray-600 text-base md:text-lg lg:text-2xl leading-relaxed">
                    {getTextFromRichText(point.point)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
