import { NextResponse } from "next/server";

export async function GET() {
  try {
    const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
    const STRAPI_API_KEY = process.env.STRAPI_API_KEY;

    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (STRAPI_API_KEY) headers["Authorization"] = `Bearer ${STRAPI_API_KEY}`;

    const url = `${STRAPI_URL}/api/ota?populate[fairSection][populate][bulletPoints][populate]=icon&populate[fairSection][populate]=image`;
    
    const response = await fetch(url, { headers, cache: "no-store", signal: AbortSignal.timeout(10000) });

    if (!response.ok) throw new Error(`Strapi API error: ${response.status}`);

    const strapiData = await response.json();

    return NextResponse.json({
      success: true,
      data: strapiData.data
    });
  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
