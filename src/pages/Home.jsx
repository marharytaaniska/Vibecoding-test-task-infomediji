import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Reviews from "../components/Reviews";
import Features from "../components/Features";
import Categories from "../components/Categories";
import DownloadCta from "../components/DownloadCta";
import Faq from "../components/Faq";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Hero />
      <Stats />
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
