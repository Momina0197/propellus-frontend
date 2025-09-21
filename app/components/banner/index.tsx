import React from "react";
import { X } from "lucide-react";

const TopBanner = () => {
  return (
    <div className="bg-[#222222] text-white py-3 px-4 relative">
      <div className="text-center text-md">
        Propellus is currently serving customers in the UK market.
      </div>
      <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300">
        <X size={18} />
      </button>
    </div>
  );
};

export default TopBanner;
