import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const navLinks = ["DeoVR User", "DeoVR Developer", "Documentation", "Release Notes"];

export default function HeroVideoHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      id="site-header"
      className={`fixed inset-x-0 top-0 z-[100] flex h-[72px] items-center justify-between gap-2 px-4 transition-colors duration-300 sm:h-[84px] sm:px-8 ${
        scrolled ? "bg-black/50 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-2 sm:gap-4 xl:gap-16">
        <Link to="/" className="shrink-0 whitespace-nowrap text-lg font-bold tracking-tight text-white">
          Logo
        </Link>
        <div className="hidden items-center gap-2 xl:flex">
          {navLinks.map((label) => (
            <a
              key={label}
              href="#"
              className="whitespace-nowrap px-5 py-2.5 text-[14px] font-medium text-white/80 transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <a
          href="#"
          className="hidden whitespace-nowrap text-[14px] font-medium text-white/80 transition-colors hover:text-white sm:inline"
        >
          Upload
        </a>
        <a
          href="#"
          className="flex h-10 shrink-0 items-center whitespace-nowrap rounded-full border border-white/30 px-5 text-[14px] font-semibold text-white transition-colors hover:bg-white/10"
        >
          Sign In
        </a>
      </div>
    </div>
  );
}
