import Footer from "../components/Footer/Footer";
import Navbar from "../components/navbar";
import GetStartedComponent from "../components/QTAs/contactform";
import FeatureCard from "../components/QTAs/fairadventure";
import PropellusFeatures from "../components/QTAs/features";
import TravelVisaSection from "../components/QTAs/herosection";
import PropellusMetricsAndValues from "../components/QTAs/values";
import VisaIntegrationSection from "../components/QTAs/visaintegrationSec";
import FAQ from "../components/TravelAgent/faq";

const QTApage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <TravelVisaSection />
      <PropellusFeatures />
      <FeatureCard />
      {/* <PropellusUnfairAdvantage/> */}
      <VisaIntegrationSection />
      <PropellusMetricsAndValues />
      <GetStartedComponent />
      <FAQ heading="Pricing FAQs" subheading="" />
      <Footer />
    </div>
  );
};

export default QTApage;
