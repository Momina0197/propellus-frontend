"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type RichTextChild = { type: string; text?: string };
type RichTextBlock = { type: string; children?: RichTextChild[] };

type VisionItem = {
  id?: number;
  title?: string;
  heading?: RichTextBlock[];
  desc?: RichTextBlock[];
  image?: {
    id?: number;
    name?: string;
    alternativeText?: string | null;
    caption?: string | null;
    width?: number;
    height?: number;
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
    };
  };
};

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function VisionSection() {
  const [data, setData] = useState<VisionItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/aboutUs/vision", { cache: "no-store" });

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

  const renderRichText = (blocks?: RichTextBlock[]) =>
    blocks?.map((block, i) => (
      <div key={i}>
        {block.children?.map((child, j) => (
          <p key={`${i}-${j}`} className={j > 0 ? "mt-4" : ""}>
            {child.text}
          </p>
        ))}
      </div>
    ));

  if (loading) return <div className="text-center py-16">Loading vision...</div>;
  if (error) return <div className="text-center py-16 text-red-500">Error: {error}</div>;
  if (!data || data.length === 0) return <div className="text-center py-16">No vision data found</div>;

  return (
    <section className="container mx-auto px-4 px-6 lg:px-20">
      {data.map((item) => (
        <div key={item.id} className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Text Section */}
          <div>
            {item.title && (
              <h2 className="text-base md:text-xl text-[#6A6A6A] mb-3">
                {item.title}
              </h2>
            )}
            {item.heading && (
              <div className="text-2xl md:text-3xl lg:text-4xl text-[#222222] leading-tight mb-6">
                {renderRichText(item.heading)}
              </div>
            )}
            {item.desc && (
              <div className="text-base md:text-xl text-[#6A6A6A] space-y-4">
                {renderRichText(item.desc)}
              </div>
            )}
          </div>

          {/* Image Section */}
          {item.image?.url && (
            <div className="flex justify-center">
              <div className="w-full sm:max-w-[400px] md:max-w-[600px] md:max-h-[421] aspect-auto overflow-hidden shadow-lg">
                <Image
                  width={item.image.width || 600}
                  height={item.image.height || 421}
                  src={getImageUrl(item.image.url)}
                  alt={item.image.alternativeText || item.image.name || "Vision illustration"}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
