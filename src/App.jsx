import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import TestHeroSection from "./pages/TestHeroSection";

function App() {
  return (
    <div className="relative w-full bg-white font-sans text-[rgb(29,36,46)]">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test-hero-section" element={<TestHeroSection />} />
      </Routes>
    </div>
  );
}

export default App;
