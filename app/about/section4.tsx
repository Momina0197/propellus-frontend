"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Advisor {
  id: number;
  name: string;
  role: string;
  imageUrl?: string | null;
}

interface Section4Data {
  intro: string;
  heading: string;
  imageUrl: string;
  advisors: Advisor[];
}

const Section4: React.FC = () => {
  const [data, setData] = useState<Section4Data | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/aboutUs/teamAndAdvisors");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json.data || null);
      } catch (err) {
        console.error("Failed to fetch section 4 data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center py-16">Loading...</p>;
  }

  if (!data) {
    return <p className="text-center py-16">No data found</p>;
  }

  return (
    <div>
      <section className="relative py-16 overflow-hidden ">
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#1C3F5D",
            backgroundImage: `
              radial-gradient(
                50% 50% at 50% 50%,
                #00C2CB 0%,
                rgba(92, 225, 230, 0) 100%
              )
            `,
            backdropFilter: "blur(200px)",
          }}
        ></div>

        <div className="container mx-auto px-6 lg:px-20 relative z-10">
    <p className="text-center text-white text-base md:text-lg mb-8 max-w-3xl mx-auto">
      {data.intro}
    </p>

    <div className="relative w-full aspect-[1250/712] rounded-3xl overflow-hidden shadow-lg border-[11px] border-[#FFFFFF0F] mb-8">
      <Image
        src={data.imageUrl}
        alt="Our Team"
        fill
        className="object-cover rounded-3xl"
      />
    </div>
    </div>
      </section>
          {/* Advisors */}
      <div className="container mx-auto px-4 mt-22 relative px-6 lg:px-20 z-10 mb-19 ">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-center text-gray-800 mb-12">
          {data.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {data.advisors.map((advisor) => (
            <div
              key={advisor.id}
              className="flex flex-col w-full max-w-[396px] gap-2"
            >
              <div className="relative w-full aspect-[396/260] rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src={advisor.imageUrl || "/images/person.png"}
                  alt={advisor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl lg:text-3xl text-gray-800">{advisor.name}</h3>
              <p className="text-gray-600 text-base">{advisor.role}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Section4;
