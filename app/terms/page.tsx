"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/Footer/Footer";
import { RichTextBlock, RichTextChild } from "../types/strapi";

type TermsSection = {
  section_heading: string;
  section_detail: RichTextBlock[];
};

type TermsData = {
  title: string;
  last_update_date: string;
  intro: RichTextBlock[];
  sections: TermsSection[];
};

export default function TermsOfService() {
  const [termsData, setTermsData] = useState<TermsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTerms() {
      try {
        const res = await fetch("/api/terms", { cache: "no-store" });
        const data = await res.json();

        if (data.error) {
          console.error("Error fetching terms:", data.error);
          setError(data.error);
          setTermsData(null);
        } else {
          setTermsData(data);
          setError(null);
        }
      } catch (err) {
        console.error("Fetch failed:", err);
        setError("Failed to fetch Terms of Service");
      } finally {
        setLoading(false);
      }
    }

    fetchTerms();
  }, []);

  // Helper function to render rich text content
  const renderRichText = (content: RichTextBlock[]) => {
    if (!content || !Array.isArray(content)) return null;

    return content.map((block, index) => {
      if (block.type === "paragraph" && block.children) {
        return (
          <p key={index} className="text-gray-600 ">
            {block.children.map((child, childIndex) => {
              if (child.type === "text" && child.text) {
                let className = "";
                if (block.format) {
                  if (block.format.includes("bold")) className += "font-bold ";
                  if (block.format.includes("italic")) className += "italic ";
                }
                
                return (
                  <span key={childIndex} className={className.trim() || undefined}>
                    {child.text}
                  </span>
                );
              }
              return null;
            })}
          </p>
        );
      }
      return null;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!termsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No Terms of Service found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />

      <main className="mx-auto px-4 py-12 lg:px-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl ml:text-4xl text-gray-800 mb-4">{termsData.title}</h1>
        </div>
        
        <div className="p-8 text-base">
          <p className="font-semibold text-gray-800 ">
            Last updated: {termsData.last_update_date}
          </p>

          <div className="text-gray-600 mb-8 ">
            {renderRichText(termsData.intro)}
          </div>

          {/* Sections */}
          {termsData.sections?.map((section, index) => (
            <div key={index} className="mb-8" >
              {section.section_heading && (
                <h2 className="font-semibold text-gray-800">
                  {section.section_heading}
                </h2>
              )}
              <div className="text-gray-600">
                {renderRichText(section.section_detail)}
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}