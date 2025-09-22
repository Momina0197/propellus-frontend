export interface BulletPoint {
  text: string;
}

export interface ImageData {
  url: string;
  alt: string;
}

export interface ButtonData {
  primary: string;
  secondary?: string;
}

export interface SectionData {
  heading: string;
  title: string;
  bulletPoints: BulletPoint[];
  image: ImageData;
  buttons: ButtonData;
}

export interface StrapiItem<T> {
  id: number;
  attributes: T;
}

export interface StrapiResponse<T> {
  data: StrapiItem<T>[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface RichTextBlock {
  type: string;
  children?: RichTextChild[];
  format?: string;
}

export interface RichTextChild {
  type: string;
  text?: string;
  children?: RichTextChild[];
}

export interface MediaItem {
  id: number;
  name: string;
  alternativeText?: string;
  url: string;
  width?: number;
  height?: number;
  formats?: Record<string, MediaFormat>;
}

export interface MediaFormat {
  name: string;
  url: string;
  width: number;
  height: number;
}

export interface RawSectionData {
  heading: string;
  Description: RichTextBlock[]; // Rich text array
  image: MediaItem[]; // Media array
  bulletPoints?: BulletPoint[]; // Add bulletPoints for processed data
}

export interface TestimonialData {
  author_name: string;
  description: string;
  country_name: string;
  author_image?: MediaItem;
}

export interface LandingPageData {
  travelAgents?: RawSectionData;
  otas?: RawSectionData;
  testimonials?: TestimonialData[];
  herosection?: {
    heading1: string;
    heading2: string;
  };
  visasection?: {
    heading: string;
    image: MediaItem[];
  };
  error?: string;
}

export interface RichTextChild {
  type: string;
  text?: string;
  children?: RichTextChild[];
}

export interface RichTextBlock {
  type: string;
  children?: RichTextChild[];
  format?: string;
}

export interface StrapiTestimonialRaw {
  id: number;
  description: RichTextBlock[];
  author_name: string;
  country_name: string;
  author_image?: MediaItem;
}

export interface InvestorData {
  name: string;
  title: string;
  description: string;
  image?: MediaItem;
  linkedin_url?: string;
}

export interface StrapiInvestorRaw {
  id: number;
  name: string;
  title: string;
  description: string;
  image?: MediaItem;
  linkedin_url?: string;
}

export interface ApproachData {
  title: string;
  subtitle: string;
  description: string;
  main_image?: MediaItem;
  secondary_image_1?: MediaItem;
  secondary_image_2?: MediaItem;
  logo_1?: MediaItem;
  logo_2?: MediaItem;
}

export interface InvestorsPageData {
  approach?: ApproachData;
  investors_section?: {
    title: string;
    subtitle: string;
    description: string;
  };
  investors?: InvestorData[];
}

export interface StrapiData {
  travelAgents: SectionData;
  otas: SectionData;
}