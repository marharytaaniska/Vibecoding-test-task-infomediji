import HeroVideoHeader from "../components/HeroVideoHeader";
import ScrollVideo from "../components/ScrollVideo";
import Reviews from "../components/Reviews";
import Features from "../components/Features";
import Categories from "../components/Categories";
import DownloadCta from "../components/DownloadCta";
import Faq from "../components/Faq";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <div className="hero-scale">
        <HeroVideoHeader />
        <ScrollVideo />
      </div>
      <Reviews />
      <Features />
      <Categories />
      <DownloadCta />
      <Faq />
      <Footer />
    </>
  );
}

export default Home;
