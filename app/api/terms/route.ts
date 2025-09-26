import { NextResponse } from "next/server";

const STRAPI_URL = process.env.STRAPI_URL || "http://127.0.0.1:1337";
const STRAPI_API_KEY = process.env.STRAPI_API_KEY;

export async function GET() {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (STRAPI_API_KEY) {
      headers["Authorization"] = `Bearer ${STRAPI_API_KEY}`;
    }

    const fullUrl = `${STRAPI_URL}/api/terms-of-services?populate=sections`;
    console.log('Fetching from:', fullUrl); // Debug log
    
    const response = await fetch(fullUrl, { headers, cache: "no-store" });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Strapi API error:', response.status, response.statusText, errorText);
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
    console.log('Strapi response:', JSON.stringify(responseData, null, 2)); // Debug log

    // Check if data exists and has the expected structure
    if (!responseData.data || !Array.isArray(responseData.data) || responseData.data.length === 0) {
      return NextResponse.json({ error: "No Terms-of-service content found" }, { status: 404 });
    }

    // Handle different possible response structures
    const firstItem = responseData.data[0];
    
    // Check if it's the direct structure or attributes structure
    let rawData;
    if (firstItem.attributes) {
      // New Strapi v4 structure: data[0].attributes
      rawData = firstItem.attributes;
    } else if (firstItem.title) {
      // Direct structure: data[0] has the properties directly
      rawData = firstItem;
    } else {
      console.error('Unexpected data structure:', firstItem);
      return NextResponse.json({ error: "Unexpected data structure from Strapi" }, { status: 500 });
    }

    // Transform the data
    const transformedData = {
      title: rawData.title || "",
      last_update_date: rawData.last_update_date || "",
      intro: rawData.intro || [],
      sections: rawData.sections
        ? rawData.sections.map((section: any) => {
            // Handle both direct and nested section structures
            const sectionData = section.attributes || section;
            return {
              section_heading: sectionData.section_heading || "",
              section_detail: sectionData.section_detail || [],
            };
          })
        : [],
    };

    console.log('Transformed data:', transformedData); // Debug log
    
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error in terms API:', error);
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