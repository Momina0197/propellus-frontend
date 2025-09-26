// app/api/aboutUs/teamAndAdvisors/route.ts
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

    const url = `${STRAPI_URL}/api/about-us?populate[our_team_and_advisors][populate][advisors][populate]=advisors_image&populate[our_team_and_advisors][populate]=team_image`;
    const res = await fetch(url, { headers, cache: "no-store" });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch from Strapi: ${res.status}` },
        { status: res.status }
      );
    }

    const strapiData = await res.json();
    const section = strapiData.data?.our_team_and_advisors;

    if (!section) {
      return NextResponse.json({ data: null });
    }

    // intro text
    const introText =
      section.intro?.[0]?.children?.map((c: any) => c.text).join(" ") || "";

    // main team image
    const imageUrl = section.team_image?.formats?.large?.url
      ? STRAPI_URL + section.team_image.formats.large.url
      : STRAPI_URL + section.team_image?.url;

    // advisors array
    const advisors = section.advisors?.map((a: any) => ({
      id: a.id,
      name: a.advisor_title,
      role: a.advisor_des,
      imageUrl:
        a.advisors_image?.formats?.thumbnail?.url
          ? STRAPI_URL + a.advisors_image.formats.thumbnail.url
          : STRAPI_URL + a.advisors_image?.url,
    }));

    return NextResponse.json({
      data: {
        intro: introText,
        heading: section.advisor_heading,
        imageUrl,
        advisors,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error", details: (err as Error).message },
      { status: 500 }
    );
  }
}
