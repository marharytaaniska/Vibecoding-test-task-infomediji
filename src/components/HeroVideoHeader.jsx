import { Link } from "react-router-dom";

const navLinks = ["DeoVR User", "DeoVR Developer", "Documentation", "Release Notes"];

export default function HeroVideoHeader() {
  return (
    <div
      id="site-header"
      className="fixed left-6 right-6 top-4 z-[100] flex h-[84px] items-center justify-between gap-2 rounded-[24px] bg-white/10 px-8 backdrop-blur-[32px]"
    >
      <Link to="/" className="shrink-0">
        <img src="/assets/logo-wordmark.png" alt="DeoVR" className="h-[34px] w-auto object-contain brightness-0 invert" />
      </Link>
      <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 xl:flex">
        {navLinks.map((label) => (
          <a
            key={label}
            href="#"
            className="whitespace-nowrap px-5 py-2.5 text-[16px] font-medium uppercase text-white/80 transition-colors hover:text-white"
          >
            {label}
          </a>
        ))}
      </div>
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          aria-label="Rewards"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
        >
          <img src="/uploads/Icon-krown.svg" alt="" className="h-5 w-5" />
        </button>
        <a
          href="#"
          className="hidden h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white/10 px-5 text-[16px] font-medium uppercase text-white transition-colors hover:bg-white/20 sm:flex"
        >
          <img src="/uploads/Icon-download.svg" alt="" className="h-5 w-5 brightness-0 invert" />
          Upload
        </a>
        <a
          href="#"
          className="whitespace-nowrap text-[16px] font-medium uppercase text-white transition-colors hover:text-white/80"
        >
          Sign In
        </a>
      </div>
    </div>
  );
}
