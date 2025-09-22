
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type RichTextChild = { type: string; text?: string };
type RichTextBlock = { type: string; children?: RichTextChild[] };

type HeroSection = {
  id?: number;
  aboutUs_heading?: string;
  aboutUs_intro?: RichTextBlock[];
  aboutUs_Image?: {
    id?: number;
    name?: string;
    alternativeText?: string | null;
    caption?: string | null;
    width?: number;
    height?: number;
    url: string;
  };
};

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function Section1() {
  const [data, setData] = useState<HeroSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/aboutUs", { cache: "no-store" });
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const json = await res.json();
        
        if (json.data) {
          setData(json.data);
        } else {
          setError("No data received from API");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  
  const getImageUrl = (url: string) => {
    if (url.startsWith('http')) return url;
    return `${STRAPI_URL}${url}`;
  };

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error) return <div className="text-center py-16 text-red-500">Error: {error}</div>;
  if (!data) return <div className="text-center py-16">No About Us data found</div>;

  return (
    <section className="py-16 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-70 blur-3xl"
        style={{
          background: `radial-gradient(50% 50% at 90% 10%, #00C2CB 0%, rgba(92,225,230,0) 100%)`,
          filter: "blur(120px)",
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        {data.aboutUs_heading && (
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
            {data.aboutUs_heading}
          </h1>
        )}

        {data.aboutUs_intro?.map((block, i) =>
          block.type === "paragraph" ? (
            <p key={i} className="text-lg md:text-xl text-gray-800 max-w-3xl mx-auto mb-4">
              {block.children?.map((child) => child.text).join("")}
            </p>
          ) : null
        )}

        {data.aboutUs_Image?.url && (
          <div className="mx-auto mt-4 rounded-lg shadow-lg inline-block p-3 bg-black/5">
            <Image
              src={getImageUrl(data.aboutUs_Image.url)}
              alt={data.aboutUs_Image.alternativeText || data.aboutUs_Image.name || "About Us"}
              width={data.aboutUs_Image.width || 1250}
              height={data.aboutUs_Image.height || 600}
              className="rounded-lg w-full h-auto max-w-full"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}