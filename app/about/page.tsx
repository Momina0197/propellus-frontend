import Navbar from "@/app/components/navbar";
import FAQ from "@/app/components/TravelAgent/faq";
import Footer from "@/app/components/Footer/Footer";
import Image from "next/image";
import ImageCarousel, { Slide } from "./ImageCarousel";
import Section1 from "./section1";
import Section2 from "./section2";
import Section3 from "./section3";
import Section4 from "./section4";

// Value Slides
const aboutSlides: Slide[] = [
  {
    src: "/images/img1.jpg",
    alt: "Pic 1",
    heading: "Customer first",
    description:
      "We prioritize our customers&apos needs and strive to exceed their expectations at every point.",
  },
  {
    src: "/images/img2.jpg",
    alt: "Image2",
    heading: " Transparency",
    description:
      "We believe in being honest, ethical, and transparent in all our interactions,.",
  },
  {
    src: "/images/img3.jpg",
    alt: "Image3",
    heading: "Ownership",
    description:
      "We take responsibility for our actions, decisions, and outcomes, .",
  },
  {
    src: "/images/img4.jpg",
    alt: "Image4",
    heading: "Quality",
    description:
      "We are dedicated to providing high-quality products and services",
  },
];

// Guide Slides
const guideSlides: Slide[] = [
  {
    src: "/images/value1.jpg",
    alt: "Pic 1",
    heading: "Consultation & Assessment",
    description:
      "Schedule a consultation to assess your travel needs and destination. We'll guide you with the visa requirements.",
  },
  {
    src: "/images/value2.jpg",
    alt: "Image2",
    heading: " Document Preparation",
    description:
      "Our experts help you gather and prepare all required documents, ensuring accuracy and completeness.",
  },
  {
    src: "/images/value3.jpg",
    alt: "Image3",
    heading: "Visa Application Submission",
    description:
      "We submit your visa application to the relevant embassy or consulate, ensuring everything meets their guidelines.",
  },
  {
    src: "/images/value4.jpg",
    alt: "Image4",
    heading: "Application Review & Updates",
    description:
      "Stay informed with real-time updates. We'll notify you of any progress, additional requests, or changes in your visa status.",
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <Section1 />
      <Section2 />
      {/* How It Works Section */}
      <section className="px-4 mb-28 mt-28">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-xl text-[#6A6A6A] mb-2">HOW IT WORKS</h2>
          <p className="text-3xl md:text-[44px] text-gray-800">What We Value</p>
        </div>
        <div className="max-w-[1250px] mx-auto">
          <ImageCarousel slides={aboutSlides} speed={40} />
        </div>
      </section>

      {/* Creating Propellus's Values Section */}
      <section className="mt-16 bg-[#ECEFF1] p-14 rounded-lg w-full mb-28">
        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-[44px] text-gray-800 mb-4">
            Creating Propellus's Values
          </h3>
          <div className="text-gray-800 text-[16px] md:text-[20px] ">
            <p>
              At Propellus, we are committed to providing a world-class travel
              experience. Whether you’re an individual planning a solo
              adventure, a family looking to create lasting memories, or a
              business traveller searching for efficiency and convenience, we
              have got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* About Values Section */}
      <section className=" px-4 mt-28">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-xl text-[#6A6A6A] mb-2">OUR GUIDE FOR</h2>
          <p className="text-3xl md:text-[44px] text-gray-800">
            Roadmap to Success
          </p>
        </div>
        <div className="max-w-[1250px] mx-auto">
          <ImageCarousel slides={guideSlides} speed={40} />
        </div>
      </section>

      <Section3 />
      <Section4 />

      {/* Logos Section */}
      <section className="mt-16 bg-[#ECEFF1] p-14 mx-auto rounded-lg w-full mb-28">
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-[159px] max-w-[1250px] mx-auto">
          <Image
            width={100}
            height={100}
            src="/images/visa.png"
            alt="Visa"
            className="h-[112px] max-w-[193px] object-contain filter brightness-0"
          />
          <Image
            width={100}
            height={100}
            src="/images/visa.png"
            alt="Visa"
            className="h-[112px] max-w-[193px] object-contain filter brightness-0"
          />
          <Image
            width={100}
            height={100}
            src="/images/aeg.png"
            alt="AEG"
            className="h-[112px] max-w-[193px] object-contain filter brightness-0"
          />
          <Image
            width={100}
            height={100}
            src="/images/goza.png"
            alt="Goza"
            className="h-[112px] max-w-[193px] object-contain filter brightness-0"
          />
        </div>
      </section>

      <FAQ />
      <Footer />
    </div>
  );
};

export default AboutUs;
