
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface RichTextBlock {
  type: string;
  children: { text: string }[];
}

interface VisaApiType {
  heading: string;
  desc: RichTextBlock[];
  Image: {
    id: number;
    url: string;
    name?: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
  };
}

interface OtaData {
  VisaApi: VisaApiType;
}

interface ApiResponse {
  success: boolean;
  data: OtaData | null;
  error?: string;
}

export default function VisaApi() {
  const [data, setData] = useState<VisaApiType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/otas/visaApi", { cache: "no-store" });
        const json: ApiResponse = await res.json();

        if (json.success && json.data?.VisaApi) setData(json.data.VisaApi);
        else setError(json.error || "Failed to load data");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getTextFromRichText = (richText: RichTextBlock[]) =>
    richText?.map(block => block.children.map(child => child.text).join('')).join('') || '';

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error) return <div className="text-center py-16 text-red-500">{error}</div>;
  if (!data) return <div className="text-center py-16">No data found</div>;

  return (
    <section className="my-22 bg-white">
    <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 px-4 md:px-12 lg:px-24">
      {/* Left Image */}
      {data.Image?.url && (
        <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden transform hover:rotate-0 transition-transform duration-300 ease-in-out">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL || ''}${data.Image.url}`}
            alt={data.Image.alternativeText || data.Image.name || "Visa API"}
            width={data.Image.width || 600}
            height={data.Image.height || 400}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Right Content */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight mb-6 ">
          {data.heading}
        </h2>
        <p className="text-gray-600 text-sm md:text-base lg:text-xl">
          {getTextFromRichText(data.desc)}
        </p>
      </div>
    </div>
    </section>
  );
}
