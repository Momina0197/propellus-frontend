import { NextResponse } from "next/server";

const STRAPI_URL =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://127.0.0.1:1337";

const STRAPI_API_KEY = process.env.STRAPI_API_KEY;

/* ---------- Types ---------- */
interface Hero {
  heading1: string;
  heading2: string;
}

interface VisaProcess {
  heading1: string;
  description: string;
  image?: any;
}

interface TravelAgentProblem {
  heading: string;
  subheading1: string;
  description1: string;
  subheading2: string;
  description2: string;
  subheading3: string;
  description3: string;
  image?: any;
}

interface Solution {
  heading: string;
  subheading1: string;
  description1: string;
  subheading2: string;
  description2: string;
  subheading3: string;
  description3: string;
  image?: any;
}

interface Heading {
  mainheading: string;
}

interface FeatureSection {
  heading: string;
  description: string;
}

interface Benefits {
  Heading: string; // ✅ Capital H as per Strapi
  subheading1: string;
  subdescription1: string;
  subheading2: string;
  subdescription2: string;
  subheading3: string;
  subdescription3: string;
}

interface VisaApplication {
  heading: string;
  image?: {
    url: string;
    alternativeText?: string;
  };
}

/* ✅ New type */
interface TravelAgentLove {
  heading: string;
  image1?: {
    url: string;
    alternativeText?: string;
  };
  image2?: {
    url: string;
    alternativeText?: string;
  };
}

interface TravelAgentData {
  hero: Hero;
  visaprocess: VisaProcess;
  travelagentproblem: TravelAgentProblem;
  solution: Solution;
  benefits: Benefits;
  heading: Heading;
  featureSection: FeatureSection[];
  visaApplication: VisaApplication;
  travelagentlove: TravelAgentLove; // ✅ added
}

/* ---------- API Route ---------- */
export async function GET() {
  try {
    console.log("Attempting to fetch travelagent data from Strapi URL:", STRAPI_URL);

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (STRAPI_API_KEY) {
      headers["Authorization"] = `Bearer ${STRAPI_API_KEY}`;
    }

    // ✅ Include travelagentlove
    const fullUrl = `${STRAPI_URL}/api/travelagents?populate[hero][populate]=*&populate[visaprocess][populate]=*&populate[travelagentproblem][populate]=*&populate[solution][populate]=*&populate[benefits][populate]=*&populate[heading]=true&populate[featureSeaction]=true&populate[visaApplication][populate]=*&populate[travelagentlove][populate]=*`;
    console.log("Full URL:", fullUrl);

    const response = await fetch(fullUrl, {
      headers,
      cache: "no-store",
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Strapi API error: ${response.status} ${response.statusText}`);
      console.error("Error response body:", errorText);

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
    console.log("Full Strapi response:", JSON.stringify(responseData, null, 2));

    if (!responseData.data) {
      console.error("No data field in Strapi response");
      return NextResponse.json(
        { error: "Invalid Strapi response structure - missing data field" },
        { status: 500 }
      );
    }

    const rawData = responseData.data;

    if (!Array.isArray(rawData) || rawData.length === 0) {
      console.error("No travelagent data found in Strapi response");
      return NextResponse.json(
        { error: "No travelagent data found" },
        { status: 404 }
      );
    }

    const firstItem = rawData[0];

    // ✅ Transform data
    const transformedData: TravelAgentData = {
      hero: {
        heading1: firstItem.hero?.heading1 || "",
        heading2: firstItem.hero?.heading2 || "",
      },
      visaprocess: {
        heading1: firstItem.visaprocess?.heading1 || "",
        description: firstItem.visaprocess?.description || "",
        image: firstItem.visaprocess?.image || undefined,
      },
      travelagentproblem: {
        heading: firstItem.travelagentproblem?.heading || "",
        subheading1: firstItem.travelagentproblem?.subheading1 || "",
        description1: firstItem.travelagentproblem?.description1 || "",
        subheading2: firstItem.travelagentproblem?.subheading2 || "",
        description2: firstItem.travelagentproblem?.description2 || "",
        subheading3: firstItem.travelagentproblem?.subheading3 || "",
        description3: firstItem.travelagentproblem?.description3 || "",
        image: firstItem.travelagentproblem?.image || undefined,
      },
      solution: {
        heading: firstItem.solution?.heading || "",
        subheading1: firstItem.solution?.subheading1 || "",
        description1: firstItem.solution?.description1 || "",
        subheading2: firstItem.solution?.subheading2 || "",
        description2: firstItem.solution?.description2 || "",
        subheading3: firstItem.solution?.subheading3 || "",
        description3: firstItem.solution?.description3 || "",
        image: firstItem.solution?.image || undefined,
      },
      benefits: {
        Heading: firstItem.benefits?.Heading || "",
        subheading1: firstItem.benefits?.subheading1 || "",
        subdescription1: firstItem.benefits?.subdescription1 || "",
        subheading2: firstItem.benefits?.subheading2 || "",
        subdescription2: firstItem.benefits?.subdescription2 || "",
        subheading3: firstItem.benefits?.subheading3 || "",
        subdescription3: firstItem.benefits?.subdescription3 || "",
      },
      heading: {
        mainheading: firstItem.heading?.mainheading || "",
      },
      featureSection:
        firstItem.featureSeaction?.map((item: any) => ({
          heading: item.heading || "",
          description: item.description?.[0]?.children?.[0]?.text || "",
        })) || [],
      visaApplication: {
        heading: firstItem.visaApplication?.heading || "",
        image: firstItem.visaApplication?.image
          ? {
              url: firstItem.visaApplication.image.url || "",
              alternativeText: firstItem.visaApplication.image.alternativeText || undefined,
            }
          : undefined,
      },
      travelagentlove: {
        heading: firstItem.travelagentlove?.heading || "",
        image1: firstItem.travelagentlove?.image1
          ? {
              url: firstItem.travelagentlove.image1.url || "",
              alternativeText: firstItem.travelagentlove.image1.alternativeText || undefined,
            }
          : undefined,
        image2: firstItem.travelagentlove?.image2
          ? {
              url: firstItem.travelagentlove.image2.url || "",
              alternativeText: firstItem.travelagentlove.image2.alternativeText || undefined,
            }
          : undefined,
      },
    };

    console.log("Transformed travelagent data:", JSON.stringify(transformedData, null, 2));

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error("Error fetching travelagent page data:", error);

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
