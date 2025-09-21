import React from 'react';

const VisaIntegrationSection = () => {
  return (
    <div className="bg-white p-6 md:p-12 lg:p-24 flex flex-col justify-center items-center">
      <div className="container mx-auto">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-12 lg:mb-24">
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
              New revenue streams with visa processing
            </h2>
            <div className="flex items-center gap-3 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right-circle flex-shrink-0">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 12h8"/>
                <path d="m12 16 4-4-4-4"/>
              </svg>
              <p className="text-gray-600">
                Upsell visa processing to your customers as value add-ons.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right-circle flex-shrink-0">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 12h8"/>
                <path d="m12 16 4-4-4-4"/>
              </svg>
              <p className="text-gray-600">
                Higher customer retention and lifetime value.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden  transform hover:rotate-0 transition-transform duration-300 ease-in-out">
            <img src="/images/frame1.png" alt="Propellus Dashboard" className="w-full h-auto object-cover"/>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden   transform  hover:rotate-0 transition-transform duration-300 ease-in-out">
            <img src="/images/frame2.png" alt="Propellus Analytics" className="w-full h-auto object-cover"/>
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Propellus Visa Integration APIs
            </h2>
            <p className="text-gray-600">
              Our APIs allow our OTA Partners to seamlessly integrate Propellus Visa processing capabilities directly into their own platforms, streamlining the customer experience while expanding their service offerings with efficient, automated visa solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaIntegrationSection;
