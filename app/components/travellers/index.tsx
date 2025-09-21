"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { TestimonialData } from '../../types/strapi';

interface TestimonialWithBg extends TestimonialData {
  bgColor: string;
}

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonials, setTestimonials] = useState<TestimonialWithBg[]>([]);
  const [loading, setLoading] = useState(true);

  const bgColors = ["bg-cyan-50", "bg-green-50", "bg-purple-50", "bg-blue-50", "bg-orange-50"];

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/strapi-data');
        const data = await response.json();
        console.log('Testimonials data received:', data);
        
        // Check if we got an error response from the API
        if (data.error) {
          console.warn('Strapi connection failed:', data.error);
          console.warn('Using fallback testimonials data');
          // Use fallback data when Strapi is not available
          setTestimonials([
            {
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.",
              author_name: "Ranjan Kumar",
              country_name: "India",
              bgColor: "bg-cyan-50"
            },
            {
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.",
              author_name: "Thabo Mlambo",
              country_name: "South Africa",
              bgColor: "bg-green-50"
            },
            {
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.",
              author_name: "Mohammed al Imran Hafeez",
              country_name: "Pakistan",
              bgColor: "bg-purple-50"
            }
          ]);
        } else if (data.testimonials && Array.isArray(data.testimonials)) {
          console.log('Using Strapi testimonials data');
          const testimonialsWithBg = data.testimonials.map((testimonial: TestimonialData, index: number) => ({
            ...testimonial,
            bgColor: bgColors[index % bgColors.length]
          }));
          setTestimonials(testimonialsWithBg);
        } else {
          console.warn('No testimonials found in Strapi data, using fallback');
          // Fallback to default testimonials if no data from Strapi
          setTestimonials([
            {
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.",
              author_name: "Ranjan Kumar",
              country_name: "India",
              bgColor: "bg-cyan-50"
            },
            {
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.",
              author_name: "Thabo Mlambo",
              country_name: "South Africa",
              bgColor: "bg-green-50"
            },
            {
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.",
              author_name: "Mohammed al Imran Hafeez",
              country_name: "Pakistan",
              bgColor: "bg-purple-50"
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Fallback to default testimonials
        setTestimonials([
          {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.",
            author_name: "Ranjan Kumar",
            country_name: "India",
            bgColor: "bg-cyan-50"
          },
          {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.",
            author_name: "Thabo Mlambo",
            country_name: "South Africa",
            bgColor: "bg-green-50"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === testimonials.length - 3 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? testimonials.length - 3 : prev - 1
    );
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentSlide + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  if (loading) {
    return (
      <div className="bg-white py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">Loading testimonials...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Travellers Love Propellus
          </h2>
          
          {/* Navigation Arrows */}
          <div className="flex space-x-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center transition-colors duration-200 group"
              aria-label="Previous testimonials"
              disabled={testimonials.length === 0}
            >
              <ChevronLeft
                size={20}
                className="text-gray-600 group-hover:text-gray-800"
              />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center transition-colors duration-200 group"
              aria-label="Next testimonials"
              disabled={testimonials.length === 0}
            >
              <ChevronRight
                size={20}
                className="text-gray-600 group-hover:text-gray-800"
              />
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getVisibleTestimonials().map((testimonial, index) => (
            <div
              key={`${currentSlide}-${index}`}
              className={`${testimonial.bgColor} rounded-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-md`}
            >
              {/* Quote */}
              <div className="mb-6">
                <p className="text-gray-600 leading-relaxed">
                  &ldquo;{testimonial.description}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-3">
                  {/* Avatar - Use author_image if available, otherwise show initials */}
                  {testimonial.author_image ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${testimonial.author_image.url}`}
                        alt={testimonial.author_image.alternativeText || testimonial.author_name}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {testimonial.author_name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                  
                  {/* Name and Location */}
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {testimonial.author_name}
                    </h4>
                    <p className="text-gray-600 text-xs">
                      {testimonial.country_name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: testimonials.length - 2 }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                currentSlide === index 
                  ? 'bg-teal-500' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;