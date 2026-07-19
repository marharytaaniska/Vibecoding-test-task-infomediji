import Header from "./components/Header";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Reviews from "./components/Reviews";
import Features from "./components/Features";
import Categories from "./components/Categories";
import DownloadCta from "./components/DownloadCta";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="relative w-full bg-white font-sans text-[rgb(29,36,46)]">
      <Header />
      <Hero />
      <Stats />
      <Reviews />
      <Features />
      <Categories />
      <DownloadCta />
      <Faq />
      <Footer />
    </div>
  );
}

export default App;
