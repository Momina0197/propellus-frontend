"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { TravellerData } from '../../types/strapi';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [travellers, setTravellers] = useState<TravellerData[]>([]);

  useEffect(() => {
    fetch('/api/strapi-data')
      .then(res => res.json())
      .then(data => setTravellers(data.travellers || []));
  }, []);

  const testimonials = travellers.map((traveller, index) => ({
    id: index + 1,
    text: traveller.description,
    author: traveller.travellername,
    location: traveller.country,
    bgColor: ['bg-teal-100', 'bg-gray-100', 'bg-orange-100'][index % 3]
  }));

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= testimonials.length - 2 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? testimonials.length - 2 : prevIndex - 1
    );
  };

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Travellers Love Propellus
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={prevSlide}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Testimonials Carousel Container */}
        <div className="relative overflow-hidden w-full">
          <div 
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 320}px)`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`${testimonial.bgColor} rounded-xl p-8 flex-shrink-0`}
                style={{ width: '500px', minHeight: '200px' }}
              >
                <p className="text-gray-700 text-base leading-relaxed mb-8">
                  {testimonial.text}
                </p>
                <div>
                  <p className="font-semibold text-gray-900 text-base mb-1">
                    {testimonial.author}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: testimonials.length - 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                currentIndex === index ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;