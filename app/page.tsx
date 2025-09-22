import React from "react";
import TopBanner from "./components/banner";
import Navbar from "./components/navbar";
import HeroSection from "./components/herosection";
import Footer from "./components/Footer/Footer";
import VisaApplicationSection from "./components/visaApplicationSection";
import TravelBusinessSections from "./components/travelAgentsSection";
import TestimonialsSection from "./components/travellers";

const MainPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopBanner />
      <Navbar />
      <HeroSection />
      <VisaApplicationSection />
      <TestimonialsSection />
      <TravelBusinessSections/>
      <Footer />
    </div>
  );
};

export default MainPage;