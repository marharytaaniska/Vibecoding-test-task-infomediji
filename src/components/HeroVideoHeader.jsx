import { Link } from "react-router-dom";

const navLinks = ["DeoVR User", "DeoVR Developer", "Documentation", "Release Notes"];

export default function HeroVideoHeader() {
  return (
    <div
      id="site-header"
      className="fixed left-6 right-6 top-4 z-[100] flex h-[84px] items-center justify-between gap-2 bg-white/10 px-8 backdrop-blur-[32px]"
    >
      <Link to="/" className="shrink-0">
        <img src="/assets/logo-wordmark.png" alt="DeoVR" className="h-[34px] w-auto object-contain" />
      </Link>
      <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 xl:flex">
        {navLinks.map((label) => (
          <a
            key={label}
            href="#"
            className="whitespace-nowrap px-5 py-2.5 text-[16px] font-medium text-white/80 transition-colors hover:text-white"
          >
            {label}
          </a>
        ))}
      </div>
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <a
          href="#"
          className="hidden whitespace-nowrap text-[16px] font-medium text-white/80 transition-colors hover:text-white sm:inline"
        >
          Upload
        </a>
        <a
          href="#"
          className="flex h-10 shrink-0 items-center whitespace-nowrap rounded-full border border-white/30 px-5 text-[16px] font-semibold text-white transition-colors hover:bg-white/10"
        >
          Sign In
        </a>
      </div>
    </div>
  );
}
