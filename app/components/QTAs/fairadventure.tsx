"use client";

import Image from "next/image";

export default function FeatureCard() {
  return (
    <div className="bg-white max-w-[1250px] mx-auto p-4 md:p-6">
      {/* Inner Container - Compact Rectangular Container */}
      <div className="bg-[#F9F9F9] border border-black/25 max-w-[1250px] mx-auto rounded-[26px] shadow-sm p-4 md:p-6  md:mx-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left Image */}
          <div className="w-full md:w-1/2">
            <Image
              src="/images/Frame 2147223817.png"
              alt="Airplane flying over world map"
              width={600}
              height={400}
              className="rounded-xl w-full h-auto object-cover"
              priority
            />
          </div>

          {/* Right Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
              Serve your customers with an unfair advantage
            </h2>

            <div className="mt-6 space-y-4">
              {/* First Point */}
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-400 flex-shrink-0 mt-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-black"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm md:text-base">
                  Go above and beyond your competitors by giving your customers
                  travel & visa services within your platform.
                </p>
              </div>

              {/* Second Point */}
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-400 flex-shrink-0 mt-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-black"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm md:text-base">
                  Increase your brand affinity and the average customer lifetime
                  value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
