"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import React from "react";

export interface Slide {
  src: string;
  alt: string;
  heading: string;
  description: string;
}

interface ImageCarouselProps {
  slides: Slide[];
  speed?: number;
}

export default function ImageCarousel({
  slides,
  speed = 30,
}: ImageCarouselProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Initialize the carousel with duplicated content for seamless looping
  useEffect(() => {
    if (!scrollRef.current || !containerRef.current) return;

    const scrollContent = scrollRef.current;
    const container = containerRef.current;

    container.scrollLeft = 0;

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;

      const elapsed = timestamp - lastTimeRef.current;

      if (elapsed > 16) {
        if (container.scrollLeft >= scrollContent.scrollWidth / 2) {
          container.scrollLeft = 0;
        } else {
          // Continue scrolling
          container.scrollLeft += (speed / 60) * (elapsed / 16);
        }
        lastTimeRef.current = timestamp;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start the animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [slides, speed]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        containerRef.current.scrollLeft = 0;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full overflow-hidden relative">
      <div ref={containerRef} className="flex w-full overflow-x-hidden">
        <div ref={scrollRef} className="flex">

          {slides.map((slide, index) => (
            <div
              key={`original-${index}`}
              className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4"
            >
              <div className="flex flex-col items-center">
                <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-xl">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mt-3 text-gray-800">
                  {slide.heading}
                </h3>
                <p className="text-center text-sm mt-1 text-gray-600">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}

          {slides.map((slide, index) => (
            <div
              key={`duplicate-${index}`}
              className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4"
            >
              <div className="flex flex-col items-center">
                <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-xl">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mt-3 text-gray-800">
                  {slide.heading}
                </h3>
                <p className="text-center text-sm md:text-base mt-1 text-gray-600 break-words max-w-xs md:max-w-sm">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
    </div>
  );
}
