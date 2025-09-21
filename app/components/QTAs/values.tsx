import Image from "next/image";
import React from "react";

const PropellusMetricsAndValues = () => {
  return (
    <div className="bg-white">
      {/* Top Section */}
      <section className="bg-[#1C3F5D] text-white p-6 md:p-12 lg:p-24 relative">
        <Image
          src={"/glow.svg"}
          height={100}
          width={100}
          className="w-full h-full absolute bottom-0 -right-80"
          alt="glow"
        />
        <div className="container mx-auto text-center">
          <p className="text-sm uppercase font-semibold text-gray-300 tracking-wider mb-2">
            How We Help
          </p>
          <h2 className="max-w-[900px] mx-auto text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-8">
            Enabling travel agents to scale fulfillment and reduce business cost
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <div className="bg-white rounded-xl p-6 w-full max-w-xs text-center">
              <h3 className="text-[44px] font-bold text-[#1C3F5D]">60%</h3>
              <p className="text-[16px] font-light mt-2 text-[#1C3F5D]">
                Reduction in payroll cost
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 w-full max-w-xs text-center">
              <h3 className="text-[44px] font-bold text-[#1C3F5D]">500%</h3>
              <p className="text-[16px] font-light mt-2 text-[#1C3F5D]">
                Increase in productivity
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 w-full max-w-xs text-center">
              <h3 className="text-[44px] font-bold text-[#1C3F5D]">70%</h3>
              <p className="text-[16px] font-light mt-2 text-[#1C3F5D]">
                Fewer errors in document validation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="bg-white p-6 md:p-12 lg:p-24">
        <div className="container mx-auto">
          <p className="text-sm uppercase font-semibold text-gray-500 tracking-wider text-center mb-2">
            How It Works
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight text-center mb-12">
            What We Value
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-start space-y-4">
              <Image
                width={100}
                height={100}
                src="/images/frame3.png"
                alt="Customer First"
                className="w-full h-[330px] rounded-[20px] object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-900">
                Customer first
              </h3>
              <p className="text-sm text-gray-600">
                We prioritize our customers&apos; needs and strive to exceed
                their expectations at every point.
              </p>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <Image
                height={100}
                width={100}
                src="/images/frame4.png"
                alt="Transparency"
                className="w-full h-[330px] rounded-[20px] object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-900">
                Transparency
              </h3>
              <p className="text-sm text-gray-600">
                We believe in being honest, ethical, and transparent in all our
                interactions.
              </p>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <Image
                height={100}
                width={100}
                src="/images/frame5.png"
                alt="Ownership"
                className="w-full h-[330px] rounded-[20px] object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-900">Ownership</h3>
              <p className="text-sm text-gray-600">
                We take responsibility for our actions, decisions, and outcomes.
              </p>
            </div>
            {/* ✅ Fixed only the 4th image */}
            <div className="flex flex-col items-start space-y-4">
              <Image
                height={100}
                width={100}
                src="/images/frame6.png"
                alt="Quality"
                className="w-full  rounded-[20px] h-[330px] object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-900">Quality</h3>
              <p className="text-sm text-gray-600">
                We are dedicated to providing high-quality products and
                services.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropellusMetricsAndValues;
