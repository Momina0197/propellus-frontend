import {
  LandingPageData,
  SectionData,
  RawSectionData,
  BulletPoint,
  RichTextBlock,
  RichTextChild,
} from "../types/strapi";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function fetchLandingPageData(): Promise<LandingPageData> {
  try {
    const res = await fetch(`${STRAPI_URL}/Landing-page?populate=deep`);

    if (!res.ok) {
      throw new Error("Failed to fetch landing page data from Strapi");
    }

    const { data } = await res.json();
    console.log("Landing page data received:", data);

    const attributes = data.attributes as LandingPageData;

    // Process bullet points for travelAgents section
    if (attributes.travelAgents && attributes.travelAgents.Description) {
      attributes.travelAgents.bulletPoints = extractBulletPoints(
        attributes.travelAgents.Description
      );
    }

    // Process bullet points for otas section
    if (attributes.otas && attributes.otas.Description) {
      attributes.otas.bulletPoints = extractBulletPoints(
        attributes.otas.Description
      );
    }

    return attributes;
  } catch (error) {
    console.error("Error fetching landing page data:", error);
    throw error;
  }
}

function extractBulletPoints(description: RichTextBlock[]): BulletPoint[] {
  const bulletPoints: BulletPoint[] = [];

  if (description) {
    description.forEach((block: RichTextBlock) => {
      if (block.type === "list" && block.children) {
        block.children.forEach((listItem: RichTextChild) => {
          if (
            listItem.children &&
            listItem.children[0] &&
            listItem.children[0].text
          ) {
            bulletPoints.push({
              text: listItem.children[0].text,
            });
          }
        });
      }
    });
  }

  return bulletPoints;
}

// Legacy function for backward compatibility
export async function fetchStrapiData(): Promise<{
  travelAgents: SectionData;
  otas: SectionData;
}> {
  try {
    const landingPageData = await fetchLandingPageData();

    // Map landing page data to legacy format
    const mapSectionData = (item: RawSectionData): SectionData => {
      // Extract bullet points from Description
      const bulletPoints: BulletPoint[] = [];
      if (item.Description) {
        item.Description.forEach((block: RichTextBlock) => {
          if (block.type === "list" && block.children) {
            block.children.forEach((listItem: RichTextChild) => {
              if (
                listItem.children &&
                listItem.children[0] &&
                listItem.children[0].text
              ) {
                bulletPoints.push({
                  text: listItem.children[0].text,
                });
              }
            });
          }
        });
      }

      // Get image URL
      const imageUrl =
        item.image && item.image[0] ? `${STRAPI_URL}${item.image[0].url}` : "";

      const imageAlt =
        item.image && item.image[0] ? item.image[0].alternativeText || "" : "";

      return {
        heading: item.heading || "",
        title: "", // hardcoded
        bulletPoints,
        image: {
          url: imageUrl,
          alt: imageAlt,
        },
        buttons: {
          primary: "", // hardcoded
          secondary: "", // hardcoded
        },
      };
    };

    return {
      travelAgents: landingPageData.travelAgents
        ? mapSectionData(landingPageData.travelAgents)
        : {
            heading: "",
            title: "",
            bulletPoints: [],
            image: { url: "", alt: "" },
            buttons: { primary: "" },
          },
      otas: landingPageData.otas
        ? mapSectionData(landingPageData.otas)
        : {
            heading: "",
            title: "",
            bulletPoints: [],
            image: { url: "", alt: "" },
            buttons: { primary: "" },
          },
    };
  } catch (error) {
    console.error("Error fetching Strapi data:", error);
    throw error;
  }
}
