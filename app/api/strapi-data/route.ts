import { NextResponse } from "next/server";
import { LandingPageData, RichTextBlock, RichTextChild, StrapiTestimonialRaw } from "../../types/strapi";

const STRAPI_URL =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://127.0.0.1:1337";
const STRAPI_API_KEY = process.env.STRAPI_API_KEY;

// Helper function to extract bullet points from Strapi rich text description
function extractBulletPointsFromDescription(description: RichTextBlock[]): { text: string }[] {
  const bulletPoints: { text: string }[] = [];
  
  if (description && Array.isArray(description)) {
    description.forEach((block: RichTextBlock) => {
      if (block.type === "list" && block.children) {
        block.children.forEach((listItem: RichTextChild) => {
          if (listItem.type === "list-item" && listItem.children && listItem.children[0]) {
            bulletPoints.push({
              text: listItem.children[0].text || ""
            });
          }
        });
      }
    });
  }
  
  return bulletPoints;
}

// Helper function to extract plain text from Strapi rich text description
function extractTextFromDescription(description: RichTextBlock[]): string {
  if (!description || !Array.isArray(description)) return "";
  
  let text = "";
  description.forEach((block: RichTextBlock) => {
    if (block.type === "paragraph" && block.children) {
      block.children.forEach((child: RichTextChild) => {
        if (child.type === "text" && child.text) {
          text += child.text;
        }
      });
    }
  });
  
  return text;
}

export async function GET() {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (STRAPI_API_KEY) {
      headers["Authorization"] = `Bearer ${STRAPI_API_KEY}`;
    }

    const fullUrl = `${STRAPI_URL}/api/landing-pages?populate%5Bgrow%5D%5Bpopulate%5D=*&populate%5Botas%5D%5Bpopulate%5D=*&populate%5Btravllerslove%5D%5Bpopulate%5D=*&populate%5Bherosection%5D%5Bpopulate%5D=*&populate%5Bvisasection%5D%5Bpopulate%5D=*&populate%5Btravellers%5D%5Bpopulate%5D=*`;

    const response = await fetch(fullUrl, {
      headers,
      cache: "no-store", // Disable caching for debugging
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: `Strapi API error: ${response.status} ${response.statusText}`,
          details: errorText,
          url: fullUrl,
        },
        { status: response.status }
      );
    }

    const responseData = await response.json();

    if (!responseData.data || !responseData.data[0]) {
      return NextResponse.json(
        { error: "Invalid Strapi response structure - missing data field" },
        { status: 500 }
      );
    }

    const rawData = responseData.data[0];

    // Transform the Strapi data structure to match our expected format
    const transformedData: LandingPageData & {
      travellers?: {
        description: string;
        travellername: string;
        country: string;
      }[];
    } = {
      travelAgents: rawData.grow && rawData.grow[0] ? {
        heading: rawData.grow[0].heading || "",
        Description: rawData.grow[0].description || [],
        image: rawData.grow[0].image ? [rawData.grow[0].image] : [],
        bulletPoints: extractBulletPointsFromDescription(rawData.grow[0].description || [])
      } : undefined,

      otas: rawData.otas && rawData.otas[0] ? {
        heading: rawData.otas[0].heading || "",
        Description: rawData.otas[0].description || [],
        image: rawData.otas[0].image ? [rawData.otas[0].image] : [],
        bulletPoints: extractBulletPointsFromDescription(rawData.otas[0].description || [])
      } : undefined,

      testimonials: rawData.travllerslove ? rawData.travllerslove.map((testimonial: StrapiTestimonialRaw) => ({
        author_name: testimonial.author_name || "",
        description: extractTextFromDescription(testimonial.description || []),
        country_name: testimonial.country_name || "",
        author_image: testimonial.author_image || undefined
      })) : [],

      herosection: rawData.herosection ? {
        heading1: rawData.herosection.heading1 || "",
        heading2: rawData.herosection.heading2 || ""
      } : undefined,

      visasection: rawData.visasection ? {
        heading: rawData.visasection.heading || "",
        image: rawData.visasection.image ? [{ ...rawData.visasection.image, url: `${STRAPI_URL}${rawData.visasection.image.url}` }] : []
      } : undefined,

    // ✅ New Travellers component
travellers: rawData.travellers
  ? rawData.travellers.map((traveller: any) => ({
      description: Array.isArray(traveller.description)
        ? extractTextFromDescription(traveller.description)
        : traveller.description || "",
      travellername: traveller.travellername || "",
      country: traveller.country || ""
    }))
  : [],

    };

    return NextResponse.json(transformedData);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch data from Strapi",
        details: error instanceof Error ? error.message : "Unknown error",
        strapiUrl: STRAPI_URL,
      },
      { status: 500 }
    );
  }
}
