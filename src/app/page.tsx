import Footer from "@/components/homepage/Footer";
import HeroSection from "@/components/homepage/HeroSection";
import HowItWorks from "@/components/homepage/HowItWorksSection";
import Navbar from "@/components/homepage/Navbar";
import WhySmartKlinik from "@/components/homepage/WhySmartKlinikSection";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <WhySmartKlinik />
      <Footer />
    </div>
  );
};

export default page;
