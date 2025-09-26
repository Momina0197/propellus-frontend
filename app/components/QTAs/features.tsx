"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export type StrapiBlock = {
  type: string;
  children: { type: string; text: string }[];
};
export type StrapiImage = {
  id: number;
  url: string;
  name: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
};

export interface Card {
  id: number;
  heading: string;
  desc: StrapiBlock[];
  logo: StrapiImage;
  bgColor?: string; 
}

export interface Features {
  id: number;
  title: string;
  heading: StrapiBlock[];
  intro: StrapiBlock[];
  desc: StrapiBlock[];
  buttonText: string;
  buttonUrl: string;
  cards: Card[];
}

const bgColors = ["bg-blue-50", "bg-yellow-50", "bg-green-50", "bg-purple-50"];

const FeaturesSection: React.FC = () => {
  const [features, setFeatures] = useState<Features | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/otas/features");
        const json = await res.json();

        if (json.data?.features) {
          const f = json.data.features;

          setFeatures({
            id: f.id,
            title: f.title ?? "",
            heading: f.heading ?? [],
            intro: f.intro ?? [],
            desc: f.desc ?? [],
            buttonText: f.buttonText ?? "",
            buttonUrl: f.buttonUrl ?? "#",
            cards: Array.isArray(f.cards)
              ? f.cards.map((card: any, idx: number) => ({
                  id: card.id,
                  heading: card.heading ?? "",
                  desc: card.desc ?? [],
                  logo: {
                    id: card.logo?.id ?? 0,
                    url: card.logo?.url ?? "",
                    name: card.logo?.name ?? "",
                    alternativeText: card.logo?.alternativeText ?? "",
                    width: card.logo?.width,
                    height: card.logo?.height,
                  },
                  bgColor: card.bgColor ?? bgColors[idx % bgColors.length],
                }))
              : [],
          });
        }
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };

    fetchData();
  }, []);

  if (!features) return null;

  return (
    <section className="bg-white py-16 px-6 lg:px-20 text-center mt-22 mb-22">
      <p className="text-gray-600 text-xl uppercase tracking-wider mb-3">
        {features.title}
      </p>

      <div className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight mb-4">
        {features.heading?.map((block, i) =>
          block.children?.map((child, j) => (
            <span key={`${i}-${j}`} className="block">
              {child.text}
            </span>
          ))
        )}
      </div>

      <div className="text-gray-600 max-w-2xl text-base md:text-xl mx-auto">
        {features.intro?.map((block, i) =>
          block.children?.map((child, j) => (
            <p key={`${i}-${j}`}>{child.text}</p>
          ))
        )}
      </div>

      <div className="mt-15 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {features.cards?.map((card) => (
          <div
            key={card.id}
            className={`p-6 rounded-2xl ${card.bgColor} shadow-lg transition-transform transform hover:scale-105 flex flex-col items-center text-center`}
          >
            {card.logo?.url && (
              <div className="relative flex items-center justify-center w-12 h-12">
                <span className="absolute inset-0 rounded-full bg-[#616161] opacity-10"></span>
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${card.logo.url}`}
                  alt={card.logo.alternativeText || card.logo.name}
                  width={20}
                  height={20}
                  className="relative z-10"
                />
              </div>
            )}
            <h3 className="mt-9 text-base md:text-xl font-normal text-gray-800">
              {card.heading}
            </h3>
            <div className="mt-2 text-gray-600 text-sm md:text-base">
              {card.desc?.map((block, i) =>
                block.children?.map((child, j) => (
                  <p key={`${i}-${j}`}>{child.text}</p>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-9 text-gray-600 text-base md:text-xl">
        {features.desc?.map((block, i) =>
          block.children?.map((child, j) => (
            <p key={`${i}-${j}`}>{child.text}</p>
          ))
        )}
      </div>

      {features.buttonText && (
        <div className="mt-9">
          <Link
            href={features.buttonUrl}
            className="bg-[#1C3F5D] text-white text-base font-medium py-3 px-6 rounded-lg shadow-lg hover:bg-opacity-90 transition-colors"
          >
            {features.buttonText}
          </Link>
        </div>
      )}
    </section>
  );
};

export default FeaturesSection;
