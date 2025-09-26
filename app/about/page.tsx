import Navbar from "@/app/components/navbar";
import FAQ from "@/app/components/TravelAgent/faq";
import Footer from "@/app/components/Footer/Footer";
import Image from "next/image";
import ImageCarousel from "./valueSlides";
import RoadmapSlides from "./roadmapSlides";
import Section1 from "./section1";
import Section2 from "./section2";
import Section3 from "./section3";
import Section4 from "./section4";
import VisionSection from "./vision";
import PropellusValues from "./porpellusValues";
import Logos from "./logos";


const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <Section1 />
      <Section2 />
      <VisionSection />
      <ImageCarousel speed={40} />
      <PropellusValues />
      <RoadmapSlides speed={40} />
      <Section3 />
      <Section4 />
      <Logos/>

      {/* Logos Section */}
      {/* <section className="mt-16 bg-[#ECEFF1] p-14 mx-auto rounded-lg w-full mb-28">
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
      </section> */}

      <FAQ />
      <Footer />
    </div>
  );
};

export default AboutUs;
