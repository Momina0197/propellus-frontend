"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type RichTextChild = { type: string; text?: string };
type RichTextBlock = { type: string; children?: RichTextChild[] };
type MissionSection = {
  id: number;
  title?: string;
  heading?: RichTextBlock[];
  desc?: RichTextBlock[];
  image?: {
    id: number;
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
    formats?: any;
  };
};

export default function Section2() {
  const [data, setData] = useState<MissionSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMission() {
      try {
        const res = await fetch("/api/aboutUs/mission", { cache: "no-store" });

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const json = await res.json();

        const missionData = json.data?.mission_section?.[0] || null;
        setData(missionData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchMission();
  }, []);

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error) return <div className="text-center py-16 text-red-500">Error: {error}</div>;
  if (!data) return <div className="text-center py-16">No Mission Data Found</div>;

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

  const imageUrl = data.image?.url
    ? data.image.url.startsWith("http")
      ? data.image.url
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.image.url}`
    : null;

  return (
    <section className="container mx-auto my-22 px-6 lg:px-20 ">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          {data.title && <h2 className="text-base md:text-xl text-[#6A6A6A] mb-3">{data.title}</h2>}
          {data.heading && (
            <div className="text-2xl md:text-3xl lg:text-4xl text-[#222222] leading-tight mb-6">
              {renderRichText(data.heading)}
            </div>
          )}
          {data.desc && (
            <div className="text-base md:text-xl text-[#6A6A6A]">
              {renderRichText(data.desc)}
            </div>
          )}
        </div>

        {imageUrl && (
          <div className="flex justify-center">
            <div className="w-full sm:max-w-[400px] md:max-w-[600px] md:max-h-[421] aspect-auto overflow-hidden shadow-lg">
              <Image
                src={imageUrl!}
                alt={data.image?.alternativeText || "Mission image"}
                width={data.image?.width || 600}
                height={data.image?.height || 421}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

        )}
      </div>
    </section>
  );
}