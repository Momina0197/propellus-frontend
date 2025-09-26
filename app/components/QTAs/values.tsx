"use client";

import { useEffect, useState } from "react";

interface RichTextBlock {
  type: string;
  children: { text: string }[];
}

interface Card {
  id: number;
  percentage: string;
  desc: string;
}

interface MetricsType {
  heading: string;
  intro: RichTextBlock[];
  cards: Card[];
}

interface OtaData {
  metrics: MetricsType;
}

interface ApiResponse {
  success: boolean;
  data: OtaData | null;
  error?: string;
}

export default function PropellusMetrics() {
  const [data, setData] = useState<MetricsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/otas/metrics", { cache: "no-store" });
        const json: ApiResponse = await res.json();

        if (json.success && json.data?.metrics) setData(json.data.metrics);
        else setError(json.error || "Failed to load metrics");
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
    <div className="bg-white">
      <section className="bg-[#1C3F5D] text-white p-6 md:p-12 lg:p-24 relative">
        <div className="container mx-auto text-center">
          <p className="text-base md:text-lg lg:text-xl uppercase font-semibold text-gray-300 tracking-wider mb-6">
            {data.heading}
          </p>
          <h2 className="max-w-[900px] mx-auto text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-12">
            {getTextFromRichText(data.intro)}
          </h2>
</div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-5 flex-wrap">
            {data.cards?.map(card => (
              <div key={card.id} className="bg-white rounded-[16px] border border-gray-300 flex flex-col justify-center items-center text-center
                 w-full sm:w-[80%] md:w-[403px] h-[175px] px-6 py-6"
              >
                <h3 className="text-2xl md:text-3xl lg:text-4xl text-[#1C3F5D]">{card.percentage}</h3>
                <p className="text-base md:text-lg lg:text-xl font-light mt-2 text-[#1C3F5D]">{card.desc}</p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
