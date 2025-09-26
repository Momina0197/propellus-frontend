"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export interface Slide {
  src: string;
  alt: string;
  heading: string;
  description: string;
}

interface RoadmapSlidesProps {
  speed?: number;
}

interface SectionData {
  title: string;
  heading: string;
  roadmap_slides: Slide[];
}

export default function RoadmapSlides({ speed = 30 }: RoadmapSlidesProps) {
  const [sectionData, setSectionData] = useState<SectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Fetch roadmap slides from API
useEffect(() => {
  async function fetchData() {
    try {
      setLoading(true);
      const res = await fetch("/api/aboutUs/roadmapSlides");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      // API already returns transformed data
      const roadmapSection = json.data;
      if (roadmapSection) {
        setSectionData(roadmapSection);
      }
    } catch (err) {
      console.error("Failed to fetch roadmap slides:", err);
    } finally {
      setLoading(false);
    }
  }
  fetchData();
}, []);


  // Smooth scrolling
  useEffect(() => {
    if (!scrollRef.current || !containerRef.current || !sectionData?.roadmap_slides?.length) return;

    const scrollContent = scrollRef.current;
    const container = containerRef.current;
    container.scrollLeft = 0;

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const elapsed = timestamp - lastTimeRef.current;

      if (elapsed > 16) {
        container.scrollLeft =
          container.scrollLeft >= scrollContent.scrollWidth / 2
            ? 0
            : container.scrollLeft + (speed / 60) * (elapsed / 16);
        lastTimeRef.current = timestamp;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [sectionData?.roadmap_slides, speed]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) containerRef.current.scrollLeft = 0;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <p className="text-center py-16">Loading...</p>;
  if (!sectionData) return <p className="text-center py-16">Failed to load content</p>;

  const slides = sectionData.roadmap_slides;

  return (
    <section className="px-4 mt-28">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h2 className="text-xl text-[#6A6A6A] mb-3">{sectionData.title}</h2>
        <p className="text-3xl md:text-[44px] text-gray-800 mb-9">{sectionData.heading}</p>
      </div>
      <div className="max-w-[1250px] mx-auto">
        <div className="w-full overflow-hidden relative">
          <div ref={containerRef} className="flex w-full overflow-x-hidden">
            <div ref={scrollRef} className="flex">
              {[...slides, ...slides].map((slide, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-xl">
                      <Image
                        src={slide.src.startsWith("http") ? slide.src : `${process.env.NEXT_PUBLIC_STRAPI_URL}${slide.src}`}
                        alt={slide.alt}
                        fill
                        className="object-cover"
                        onError={(e) => console.error("Image failed to load:", slide.src)}
                      />
                    </div>
                    <h3 className="text-lg font-semibold mt-3 text-gray-800">{slide.heading}</h3>
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
      </div>
    </section>
  );
}
