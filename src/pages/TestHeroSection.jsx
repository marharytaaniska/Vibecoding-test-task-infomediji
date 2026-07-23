import HeroVideoHeader from "../components/HeroVideoHeader";
import ScrollVideo from "../components/ScrollVideo";
import Footer from "../components/Footer";

function TestHeroSection() {
  return (
    <>
      <div className="hero-scale">
        <HeroVideoHeader />
        <ScrollVideo />
      </div>
      <Footer />
    </>
  );
}

export default TestHeroSection;
