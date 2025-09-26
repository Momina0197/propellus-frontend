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
  const [data, setData] = useState<HeroSection[] | null>(null);
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

        if (json.data && Array.isArray(json.data)) {
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
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${STRAPI_URL}${url}`;
  };

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error) return <div className="text-center py-16 text-red-500">Error: {error}</div>;
  if (!data || data.length === 0) return <div className="text-center py-16">No About Us data found</div>;

  return (
    <section className="pt-14 pb-20 px-6 lg:px-20 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-70 blur-3xl"
        style={{
          background: `radial-gradient(50% 50% at 90% 10%, #00C2CB 0%, rgba(92,225,230,0) 100%)`,
          filter: "blur(120px)",
        }}
      ></div>

      <div className="px-6 lg:px-20 relative z-10 text-center">
        {data.map((section) => (
          <div key={section.id} className="container mx-auto relative z-10 ">
            {section.aboutUs_heading && (
              <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4">
                {section.aboutUs_heading}
              </h1>
            )}

            {section.aboutUs_intro?.map((block, i) =>
              block.type === "paragraph" ? (
                <p key={i} className="text-base md:text-xl text-gray-800 max-w-3xl mx-auto mb-10">
                  {block.children?.map((child) => child.text).join("")}
                </p>
              ) : null
            )}

            {section.aboutUs_Image?.url && (
              <div className="relative w-full max-w-[1250] rounded-3xl overflow-hidden shadow-lg border-[11px] border-[#FFFFFF0F] mx-auto mt-4 ">
                <Image
                  src={getImageUrl(section.aboutUs_Image.url)}
                  alt={section.aboutUs_Image.alternativeText || section.aboutUs_Image.name || "About Us"}
                  width={1250}
                  height={600}
                  className="object-cover rounded-3xl"
                  priority
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
