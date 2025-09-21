// app/components/about/Section4.tsx
"use client";

import Image from "next/image";
import React from "react";

interface Advisor {
  src: string;
  alt: string;
  name: string;
  role: string;
}

const advisors: Advisor[] = [
  {
    src: "/images/advisor1.png",
    alt: "Ali Ladhubhai",
    name: "Ali Ladhubhai",
    role: "Advisor – Growth",
  },
  {
    src: "/images/person.png",
    alt: "Sultan Ali",
    name: "Sultan Ali",
    role: "Advisor – Travel",
  },
];

const Section4: React.FC = () => {
  return (
    <div>
      <section className="relative py-16 overflow-hidden">
        {/* Background */}
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

        {/* Text + team image */}

        <div className="container mx-auto px-4 relative z-10 max-w-[1266px]">
          {/* Text */}
          <p className="text-center text-white text-lg mb-8 max-w-3xl mx-auto">
            We are a rapidly growing global company helping travellers and
            agencies improve and simplify visa processing through our AI powered
            system.
          </p>

          {/* Image box */}
          <div className="relative mx-auto w-full aspect-[1266/712] rounded-3xl overflow-hidden shadow-lg border-[11px] border-[#FFFFFF0F] ">
            <Image
              src="/images/image.png"
              alt="Our Team"
              fill
              className="object-cover rounded-3xl"
            />
          </div>
        </div>
      </section>

      {/* Advisors */}
      <div className="container mx-auto px-4 mt-16 relative z-10">
        <h2 className="text-[44px] text-center text-gray-800 mb-12">
          Advisors
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
  {advisors.map((advisor, index) => (
    <div key={index} className="flex flex-col  w-[396px] max-w-full gap-2">
      {/* Image box */}
      <div className="relative w-full aspect-[396/260] h-[260px] rounded-3xl overflow-hidden shadow-lg ">
        <Image
          src={advisor.src}
          alt={advisor.alt}
          fill
          className="object-cover"
        />
      </div>

      <h3 className="text-3xl text-gray-800 mt-2">
        {advisor.name}
      </h3>
      <p className="text-gray-600 text-base">{advisor.role}</p>
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default Section4;
