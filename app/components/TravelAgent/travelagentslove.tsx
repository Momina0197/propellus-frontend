// components/TravelAgentLove.jsx
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TestimonialData, LandingPageData, MediaItem } from '../../types/strapi';

interface TravelAgentLoveData {
  heading: string;
  image1?: MediaItem;
  image2?: MediaItem;
}

const TravelAgentLove = () => {
  const [testimonial, setTestimonial] = useState<TestimonialData | null>(null);
  const [travelAgentLoveData, setTravelAgentLoveData] = useState<TravelAgentLoveData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const response = await fetch('/api/strapi-data');
        const data: LandingPageData = await response.json();
        console.log('TravelAgentLove data received:', data);
        
        // Check if we got an error response from the API
        if (data.error) {
          console.warn('Strapi connection failed:', data.error);
          console.warn('Using fallback testimonial data');
          setTestimonial({
            author_name: "Sultan Ali",
            description: "Propellus has made our and our travelers lives easier.",
            country_name: "Prince Visa"
          });
        } else if (data.testimonials && Array.isArray(data.testimonials) && data.testimonials.length > 0) {
          console.log('Using Strapi testimonial data');
          // Use the first testimonial for this component
          setTestimonial(data.testimonials[0]);
        } else {
          console.warn('No testimonials found in Strapi data, using fallback');
          setTestimonial({
            author_name: "Sultan Ali",
            description: "Propellus has made our and our travelers lives easier.",
            country_name: "Prince Visa"
          });
        }
      } catch (error) {
        console.error('Error fetching testimonial data:', error);
        setTestimonial({
          author_name: "Sultan Ali",
          description: "Propellus has made our and our travelers lives easier.",
          country_name: "Prince Visa"
        });
      } finally {
        setLoading(false);
      }
    };

    const fetchTravelAgentLove = async () => {
      try {
        const response = await fetch('/api/travelagents');
        const data = await response.json();
        if (data.travelagentlove) {
          setTravelAgentLoveData(data.travelagentlove);
        }
      } catch (error) {
        console.error('Error fetching travelagentlove data:', error);
      }
    };

    fetchTestimonial();
    fetchTravelAgentLove();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 py-12 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">Loading testimonial...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Testimonial Section */}
      <div className="bg-gray-50 py-12 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Why Travel Agents Love Propellus
            </h2>
            <div className="flex space-x-2">
              <button className="p-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="p-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-12 p-8 bg-white rounded-3xl shadow-lg">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-48 lg:h-48 rounded-2xl overflow-hidden flex-shrink-0 mb-6 lg:mb-0">
              <Image
                src={
                  testimonial?.author_image?.url
                    ? `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337"}${testimonial.author_image.url}`
                    : "/images/person.png"
                }
                alt={testimonial?.author_name || "Author"}
                layout="fill"
                objectFit="cover"
                className="rounded-2xl"
              />
            </div>
            <div className="relative text-center lg:text-left flex-grow">
              {/* Large quotation mark */}
              <div className="absolute top-0 left-0 -ml-8 -mt-10 lg:-ml-12 lg:-mt-12 text-6xl sm:text-7xl lg:text-8xl font-extrabold text-gray-200 opacity-75 select-none z-0">
                “
              </div>
              <div className="relative z-10 text-2xl sm:text-3xl font-semibold text-gray-800 italic leading-relaxed pt-8 lg:pt-0">
                {testimonial?.description || "Propellus has made our and our travelers lives easier."}
              </div>
              <div className="mt-6 font-semibold text-gray-900">
                {testimonial?.author_name || "Sultan Ali"}
              </div>
              <div className="text-sm text-gray-500">
                {testimonial?.country_name || "Prince Visa"}
              </div>
            </div>
          </div>
        </div>
      </div>
 
 

{/* Call-to-Action (CTA) Section */}
<div className="bg-slate-800 text-white py-12 px-6 sm:px-12 lg:px-24 overflow-hidden relative">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
    <div className="text-center md:text-left mb-8 md:mb-0">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
        {travelAgentLoveData?.heading || "Process your first 5 visa applications for £0"}
      </div>
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <Link href="/request-call">
          <button className="bg-cyan-400 hover:bg-cyan-500 text-slate-800 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
            Request a Call
          </button>
        </Link>
        <Link href="/view-demo">
          <button className="border-2 border-white hover:bg-white hover:text-slate-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
            View Live Demo
          </button>
        </Link>
      </div>
    </div>
    <div className="relative w-full max-w-sm md:max-w-md h-56 md:h-64">
      <Image
        src={
          travelAgentLoveData?.image1?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337"}${travelAgentLoveData.image1.url}`
            : "/images/group.png"
        }
        alt={travelAgentLoveData?.image1?.alternativeText || "World map with location pins"}
        layout="fill"
        objectFit="contain"
      />
    </div>
  </div>

  {/* Arrow Vector Image - Moved further upward */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:top-auto md:bottom-[15%] md:left-[55%] md:-translate-x-0 md:translate-y-0 lg:left-[50%] w-40 h-auto sm:w-56 lg:w-64 opacity-70 z-0">
    <Image
      src={
        travelAgentLoveData?.image2?.url
          ? `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337"}${travelAgentLoveData.image2.url}`
          : "/images/Vector.png"
      }
      alt={travelAgentLoveData?.image2?.alternativeText || "Arrow pointing to map"}
      width={250}
      height={150}
      layout="responsive"
      objectFit="contain"
    />
  </div>
</div>

 
   
 
    </>
  );
};

export default TravelAgentLove;