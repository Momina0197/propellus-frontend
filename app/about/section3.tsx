// app/components/About/Section3.tsx
"use client";

import React from "react";
import Image from "next/image";

interface Feature {
  src: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    src: "/images/team1.png",
    title: "Usman Zuberi",
    description: "Co-Founder Marketing / Operations",
  },
  {
    src: "/images/team2.png",
    title: "ShuTheng Tan",
    description: "Co-Founder Finance / HR / Corporate",
  },
  {
    src: "/images/team3.png",
    title: "Ghena Ahsan",
    description: "Product Lead",
  },
  {
    src: "/images/team4.png",
    title: "Ayaz Baig",
    description: "Engineering Lead",
  },
];

const Section3: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl text-center text-gray-800 mb-10">
        Meet the Team
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="text-center justify-items-center">
            <Image
              width={100}
              height={100}
              src={feature.src}
              alt={feature.title}
              className="h-[280px] w-[280px] object-cover rounded-2xl shadow-md mb-4"
            />
            <h3 className="text-xl text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section3;
