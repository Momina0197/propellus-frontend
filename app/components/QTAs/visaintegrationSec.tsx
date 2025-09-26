
"use client"

import { useEffect, useState } from "react";
import Image from "next/image";

type RichTextChild = { type: string; text?: string };
type RichTextBlock = { type: string; children?: RichTextChild[] };

type BulletPoint = {
  id: number;
  point: RichTextBlock[];
  icon: { id: number; url: string; name?: string; alternativeText?: string | null };
};

type VisaIntegrationSectionType = {
  title: RichTextBlock[];
  image: { id: number; url: string; name?: string; alternativeText?: string | null; width?: number; height?: number };
  bulletPoints: BulletPoint[];
};

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function VisaIntegrationSection() {
  const [data, setData] = useState<VisaIntegrationSectionType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/otas/visaIntegration", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json = await res.json();

        if (json.data) setData(json.data);
        else setError("No data received from API");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getImageUrl = (url: string) => (url.startsWith("http") ? url : `${STRAPI_URL}${url}`);

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error) return <div className="text-center py-16 text-red-500">{error}</div>;
  if (!data) return <div className="text-center py-16">No data found</div>;

  return (
    <section className="my-22 bg-white">
      <div className="container mx-auto px-4 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center gap-10">
        <div className="w-full lg:w-1/2">
          {data.title.map((block, i) =>
            block.type === "paragraph" ? (
              <h2 key={i} className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                {block.children?.map((child) => child.text).join("")}
              </h2>
            ) : null
          )}

          <div className="flex flex-col gap-6">
            {data.bulletPoints.map((bullet) => (
              <div key={bullet.id} className="flex items-center gap-6">
                {bullet.icon?.url && (
                  <div className="w-8 h-8 flex-shrink-0 relative">
                    <Image
                      src={getImageUrl(bullet.icon.url)}
                      alt={bullet.icon.alternativeText || bullet.icon.name || "icon"}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <p className="text-gray-600 text-base md:text-lg lg:text-2xl">
                  {bullet.point.map((block) =>
                    block.type === "paragraph"
                      ? block.children?.map((child) => child.text).join("")
                      : ""
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        {data.image?.url && (
          <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden">
            <Image
              src={getImageUrl(data.image.url)}
              alt={data.image.alternativeText || data.image.name || "Main Image"}
              width={data.image.width || 600}
              height={data.image.height || 400}
              className="object-cover w-full h-auto"
            />
          </div>
        )}
      </div>
    </section>
  );
}
