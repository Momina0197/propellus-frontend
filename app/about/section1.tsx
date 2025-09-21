"use client";

import React from "react";
import Image from 'next/image';

const Section1: React.FC = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
            About us
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We are a rapidly growing global company helping travellers and
            agencies improve and simplify visa processing through our AI powered
            system.
          </p>
          <div className="mx-auto mt-4 rounded-lg shadow-lg inline-block p-3 bg-black/5">
            <Image
              src="/images/aboutus.jpg"
              alt="AboutUs"
              width={1250}
              height={600}
              className="rounded-lg w-full h-auto max-w-full"
            />
          </div>
        </div>
      </section>
    );
};

export default Section1;