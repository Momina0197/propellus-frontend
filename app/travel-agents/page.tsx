import { headers } from 'next/headers';
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/navbar";
import BenefitsFeatures from "@/app/components/TravelAgent/BenefitFeatures";
import FAQ from "@/app/components/TravelAgent/faq";
import ProblemSolutionSection from "@/app/components/TravelAgent/ProblemSolutionSection";
import TravelAgentLove from "@/app/components/TravelAgent/travelagentslove";
import HeroSection from "@/app/components/TravelAgent/travelbanner";
import VisaProcessingSection from "@/app/components/TravelAgent/visaProcessSection";
import VisaSteps from "@/app/components/TravelAgent/visaSteps";

const TravelAgentsPage = async () => {
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const apiUrl = `${protocol}://${host}/api/travelagents`;

  const response = await fetch(apiUrl, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch travel agent data');
  }

  const data = await response.json();

  const visaApplication = data.visaApplication || { heading: "Visa application in 3 simple steps" };

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <VisaProcessingSection />
      <ProblemSolutionSection />
      <BenefitsFeatures />
      <VisaSteps visaApplication={visaApplication} />
      <TravelAgentLove />
      <FAQ />
      <Footer />
    </div>
  );
};

export default TravelAgentsPage;
