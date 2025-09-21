"use client";

import React from "react";
import Image from "next/image";

const Section1: React.FC = () => {
  return (
    <div>
      {/* Mission Section */}
      <section className="max-w-[1250px] mx-auto mt-12 px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-xl text-[#6A6A6A] mb-2">Our Mission</h2>
            <p className="text-3xl md:text-4xl lg:text-[44px] text-[#222222] leading-tight mb-6">
              To make obtaining visas as seamless as booking a flight,
              regardless of passport strength, by leading the world in one-click
              visa solutions
            </p>
            <p className="text-lg md:text-[20px] text-[#6A6A6A]">
              Our mission is to solve the visa challenges for weak passport
              holders through AI-powered automation, helping 300 million
              travelers move freely. We empower travel agents and partners to
              scale, reduce costs, and unlock new revenue streams through
              innovative solutions.
            </p>
          </div>
          <div className="flex justify-center max-w-[600px] max-h-[420px]">
            <Image
              width={100}
              height={100}
              src="/images/passport.jpg"
              alt="Mission illustration"
              className="w-full max-w-[600px] h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="max-w-[1250px] mx-auto mt-12 px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <Image
              width={100}
              height={100}
              src="/images/vision.jpg"
              alt="Vision illustration"
              className="w-full max-w-[600px] h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-xl text-[#6A6A6A] mb-2">Vision Statement</h2>
            <p className="text-3xl md:text-4xl lg:text-[44px] text-[#222222] leading-tight mb-6">
              Reduce the gap between weak and strong passport holders&apos
              travel experience
            </p>
            <div className="text-lg md:text-[20px] text-[#6A6A6A] space-y-4">
              <p>
                Help travel agents offer fully automated visa-processing
                services to 300m travelers
              </p>
              <p>
                One-click visa (Apple/Samsung Pay of visa processing services)
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Section1;
