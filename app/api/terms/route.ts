import { NextResponse } from "next/server";
import { RichTextBlock, RichTextChild, TermsOfServiceResponse } from "../../types/strapi";

const STRAPI_URL =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://127.0.0.1:1337";
const STRAPI_API_KEY = process.env.STRAPI_API_KEY;

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

    // const fullUrl = `${STRAPI_URL}/api/terms-of-services?populate=*`;
    const fullUrl = `${STRAPI_URL}/api/terms-of-services?populate[Terms][populate]=sections`;
    
    const response = await fetch(fullUrl, { headers, cache: "no-store" });

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

    const responseData = await response.json() as { data: TermsOfServiceResponse[] };

    // ✅ your Terms field is directly under data[0]
    if (!responseData.data || !responseData.data[0]?.Terms) {
      return NextResponse.json(
        { error: "No Terms-of-service content found in Strapi" },
        { status: 404 }
      );
    }

    const rawData = responseData.data[0].Terms[0];

    const transformedData = {
      title: rawData.title || "",
      last_update_date: rawData.last_update_date || "",
      intro: rawData.intro ? extractTextFromDescription(rawData.intro) : "",
      sections: rawData.sections 
        ? rawData.sections.map((section: any) => ({
          section_heading: section.section_heading || "",
          section_detail: section.section_detail
            ? extractTextFromDescription(section.section_detail)
            : "",
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
