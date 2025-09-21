 import Footer from "../components/Footer/Footer";
import PropellusApproach from "../components/investors/approach";
import PropellusProblem from "../components/investors/herosec";
import PropellusInvestors from "../components/investors/investor";
import Navbar from "../components/navbar";
 
import FAQ from "../components/TravelAgent/faq";
import InvestInPropellus from "../components/investors/investin";
 
const investorpage = () => {
  return (
    <div className="min-h-screen">
        <Navbar/>
       <PropellusProblem/>
       <PropellusApproach/>
       <PropellusInvestors/>
       <InvestInPropellus/>
      <FAQ />
      <Footer/>
    </div>
  );
};

export default investorpage;
