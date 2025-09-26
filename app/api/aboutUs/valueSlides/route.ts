// app/api/aboutUs/route.ts
import { NextResponse } from "next/server";

const STRAPI_URL =
  process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";
const STRAPI_API_KEY = process.env.STRAPI_API_KEY;

export async function GET() {
  try {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (STRAPI_API_KEY) headers["Authorization"] = `Bearer ${STRAPI_API_KEY}`;

    const url = `${STRAPI_URL}/api/about-us?populate[value][populate][value_slides][populate]=*`;
    const res = await fetch(url, { headers, cache: "no-store" });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch from Strapi: ${res.status}` },
        { status: res.status }
      );
    }

    const strapiData = await res.json();

    // Extract the value array from the response
    const valueSections = strapiData.data?.value || [];
    if (valueSections.length === 0) {
      return NextResponse.json({ data: null });
    }

    const valueSection = valueSections[0];
    const transformedData = {
      title: valueSection.title,
      heading: valueSection.heading,
      value_slides: valueSection.value_slides?.map((slide: any) => ({
        src: slide.image?.[0]?.url?.startsWith("http")
          ? slide.image[0].url
          : `${STRAPI_URL}${slide.image?.[0]?.url}`,
        alt: slide.image?.[0]?.alternativeText || slide.heading || "Slide",
        heading: slide.heading,
        description:
          slide.desc?.[0]?.children?.map((c: any) => c.text).join("") || "",
      })) || [],
    };

    return NextResponse.json({ data: transformedData });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error", details: (err as Error).message },
      { status: 500 }
    );
  }
}
