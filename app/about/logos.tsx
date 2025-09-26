// components/Logos.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface LogoImage {
    id: number;
    url: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
}

interface LogosData {
    id: number;
    title: string;
    logo1: LogoImage;
    logo2: LogoImage;
    logo3: LogoImage;
    logo4: LogoImage;
}

const Logos: React.FC = () => {
    const [logosData, setLogosData] = useState<LogosData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchLogos() {
            try {
                const res = await fetch("/api/aboutUs/logos");
                if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
                const data = await res.json();
                setLogosData(data.data);
            } catch (err: any) {
                setError(err.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        }

        fetchLogos();
    }, []);

    if (loading) return <p className="text-center py-10">Loading logos...</p>;
    if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
    if (!logosData) return null;

    const logosArray = [logosData.logo1, logosData.logo2, logosData.logo3, logosData.logo4];

    return (
        <section className="mt-22 bg-[#ECEFF1] p-14 mx-auto rounded-lg w-full mb-28">
            <div className="container mx-auto px-6 lg:px-20 ">
            <div className="text-center mb-14 w-full ">
                <h3 className="md:text-2xl text-base text-gray-800">{logosData.title}</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
    {logosArray.map((logo) => (
      <div
        key={logo.id}
        className="flex justify-center items-center w-full"
      >
        <Image
          loader={({ src }) =>
            `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${src}`
          }
          src={logo.url}
          width={logo.width || 100}
          height={logo.height || 100}
          alt={logo.alternativeText || "Logo"}
          className="object-contain max-h-[100px] max-w-[100] filter brightness-0"
        />
      </div>
    ))}
  </div>
            </div>
        </section>
    );
};

export default Logos;
