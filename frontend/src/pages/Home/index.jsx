import Hero from "../../components/layout/Hero";
import Features from "../../components/landing/Features";
import Pricing from "../../components/landing/Pricing";
import FAQs from "../../components/landing/FAQs";
import CTASection from "../../components/landing/CTASection";

const index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <Features />
        <Pricing />
        <FAQs />
        <CTASection />
      </main>
    </div>
  );
};

export default index;
