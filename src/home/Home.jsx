import React from "react";
import HeroSection from "./HeroSection";
import HelpSection from "./HelpSection";
import AppPromoSection from "./AppPromoSection";
import ShiplyInfo from "./ShiplyInfo";
import HowItWorks from "./HowItWorks";
import BusinessSteps from "./BusinessSteps";
import EarnDaily from "./EarnDaily";
import SectionReveal from "./SectionReveal";

const Home = () => {
  return (
    <main>
      <SectionReveal>
        <HeroSection />
      </SectionReveal>

      <SectionReveal delay={0.05}>
        <ShiplyInfo />
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <EarnDaily />
      </SectionReveal>

      <SectionReveal delay={0.15}>
        <HowItWorks />
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <BusinessSteps />
      </SectionReveal>
      {/* <HelpSection /> */}
      {/* <AppPromoSection /> */}
    </main>
  );
};

export default Home;
