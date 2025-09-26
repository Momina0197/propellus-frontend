// app/api/vision/route.ts
import { NextResponse } from "next/server";

const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";
const STRAPI_API_KEY = process.env.STRAPI_API_KEY;

export async function GET() {
  try {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (STRAPI_API_KEY) headers["Authorization"] = `Bearer ${STRAPI_API_KEY}`;

    const url = `${STRAPI_URL}/api/about-us?populate[vision_section][populate]=*`;
    const res = await fetch(url, { headers, cache: "no-store" });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch from Strapi: ${res.status}` },
        { status: res.status }
      );
    }

    const strapiData = await res.json();
    
    // Extract vision section data from the response structure
    const visionSectionData = strapiData.data?.vision_section || [];

    return NextResponse.json({
      data: visionSectionData
    });
    
  } catch (err) {
    return NextResponse.json(
      { error: "Server error", details: (err as Error).message },
      { status: 500 }
    );
  }
}