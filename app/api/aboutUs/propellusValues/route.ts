// app/api/aboutUs/propellusValues/route.ts
import { NextResponse } from "next/server";

const STRAPI_URL =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://127.0.0.1:1337";
const STRAPI_API_KEY = process.env.STRAPI_API_KEY;

export async function GET() {
  try {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (STRAPI_API_KEY) headers["Authorization"] = `Bearer ${STRAPI_API_KEY}`;

    // Strapi endpoint with populate for creatingPropellusValues
    const url = `${STRAPI_URL}/api/about-us?populate[creatingPropellusValues][populate]=*`;
    const res = await fetch(url, { headers, cache: "no-store" });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch from Strapi: ${res.status}` },
        { status: res.status }
      );
    }

    const strapiData = await res.json();

    // Extract creatingPropellusValues from the Strapi response
    const creatingPropellusValues = strapiData.data?.creatingPropellusValues || [];

    return NextResponse.json({
      data: creatingPropellusValues,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error", details: (err as Error).message },
      { status: 500 }
    );
  }
}
