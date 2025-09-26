// components/PropellusValues.tsx
"use client";

import React, { useEffect, useState } from "react";

interface RichTextChild {
  type: string;
  text?: string;
}

interface RichTextBlock {
  type: string;
  children?: RichTextChild[];
}

interface CreatingPropellusValue {
  id: number;
  heading: string;
  desc: RichTextBlock[];
}

const PropellusValues: React.FC = () => {
  const [values, setValues] = useState<CreatingPropellusValue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchValues() {
      try {
        const res = await fetch("/api/aboutUs/propellusValues");
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = await res.json();
        setValues(data.data || []);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchValues();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <section className="mt-16 bg-[#ECEFF1] p-14 rounded-lg w-full mb-28">
      <div className="text-center max-w-4xl mx-auto">
        {values.map((item) => (
          <div key={item.id}>
            <h3 className="text-3xl md:text-[44px] text-gray-800 mb-4">{item.heading}</h3>
            <div className="text-gray-800 text-[16px] md:text-[20px]">
              {item.desc.map((block, index) => (
                <p key={index}>
                  {block.children?.map((child, idx) => (
                    <React.Fragment key={idx}>{child.text}</React.Fragment>
                  ))}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropellusValues;
