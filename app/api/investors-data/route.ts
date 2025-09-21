import { NextResponse } from "next/server";

const STRAPI_URL =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://127.0.0.1:1337";
const STRAPI_API_KEY = process.env.STRAPI_API_KEY;

// Types for the structure
interface InvestorsHero {
  heading: string;
  description: string;
  image?: any;
}

interface Approach {
  title1: string;
  title2: string;
  description: string;
  image1?: any;
  image2?: any;
  image3?: any;
}

interface InvestorsHeading {
  heading1: string;
  heading2: string;
  description: string;
}

interface Investor {
  author_name: string;
  author_info: string | any[];
  linkedIn_url: string;
  profile?: any; // image
}

interface InvestorsData {
  investorsHero: InvestorsHero;
  approach: Approach;
  investorsheading: InvestorsHeading[]; // ✅ array not object
  investor: Investor[];
  form: {
    heading1: string;
    heading2: string;
    image?: any;
  } | null;
}

export async function GET() {
  try {
    console.log("Attempting to fetch investors data from Strapi URL:", STRAPI_URL);
    console.log("Using API Key:", STRAPI_API_KEY ? "Yes" : "No");

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (STRAPI_API_KEY) {
      headers["Authorization"] = `Bearer ${STRAPI_API_KEY}`;
    }

  // Fetch from investors endpoint with all components populated (including form)
  const fullUrl = `${STRAPI_URL}/api/investors?populate[investorsHero][populate]=*&populate[approach][populate]=*&populate[investorsheading][populate]=*&populate[investor][populate]=*&populate[form][populate]=*`;
    console.log("Full URL:", fullUrl);

    const response = await fetch(fullUrl, {
      headers,
      cache: "no-store", // Disable caching for debugging
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

    if (!responseData.data || !responseData.data[0]) {
      console.error("No data field in Strapi response");
      return NextResponse.json(
        { error: "Invalid Strapi response structure - missing data field" },
        { status: 500 }
      );
    }

    const rawData = responseData.data[0];
    console.log("Raw investors data:", JSON.stringify(rawData, null, 2));

    // ✅ Transform the Strapi data structure
    const transformedData: InvestorsData = {
      investorsHero: {
        heading: rawData.investorsHero?.heading || "",
        // Strapi field is "Description" (capital D)
        description: rawData.investorsHero?.Description || "",
        image: rawData.investorsHero?.image || undefined,
      },
      approach: {
        title1: rawData.approach?.title1 || "",
        title2: rawData.approach?.title2 || "",
        description: rawData.approach?.description || "",
        image1: rawData.approach?.image1 || undefined,
        image2: rawData.approach?.image2 || undefined,
        image3: rawData.approach?.image3 || undefined,
      },
      // ✅ Map array instead of treating as object
      investorsheading: rawData.investorsheading
        ? rawData.investorsheading.map((item: any) => ({
            heading1: item.heading1 || "",
            heading2: item.heading2 || "",
            description: item.description || "",
          }))
        : [],
      investor: rawData.investor
        ? rawData.investor.map((inv: any) => ({
            author_name: inv.author_name || "",
            author_info: inv.author_info || [],
            linkedIn_url: inv.linkedIn_url || "",
            profile: inv.profile || undefined,
          }))
        : [],
      // Map the `form` component if present
      form: rawData.form
        ? {
            heading1: rawData.form.heading1 || "",
            heading2: rawData.form.heading2 || "",
            image: rawData.form.image || undefined,
          }
        : null,
    };

    console.log("Transformed investors data:", JSON.stringify(transformedData, null, 2));

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error("Error fetching investors page data:", error);

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
