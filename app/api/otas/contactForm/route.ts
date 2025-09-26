import { NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function GET() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/ota?populate[contactForm][populate][logos][populate]=*`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch data" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ data: data.data.contactForm });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
