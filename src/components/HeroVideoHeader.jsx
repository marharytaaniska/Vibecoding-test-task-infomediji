import { Link } from "react-router-dom";

const navLinks = ["DeoVR User", "DeoVR Developer", "Documentation", "Release Notes"];

export default function HeroVideoHeader() {
  return (
    <div
      id="site-header"
      className="fixed left-[calc(24px*var(--hero-scale))] right-[calc(24px*var(--hero-scale))] top-[calc(16px*var(--hero-scale))] z-[100] flex h-[calc(84px*var(--hero-scale))] items-center justify-between gap-[calc(8px*var(--hero-scale))] rounded-[calc(24px*var(--hero-scale))] bg-white/5 px-[calc(32px*var(--hero-scale))] backdrop-blur-[calc(32px*var(--hero-scale))]"
    >
      <Link to="/" className="shrink-0">
        <img
          src="/assets/logo-wordmark.png"
          alt="DeoVR"
          className="h-[calc(34px*var(--hero-scale))] w-auto object-contain brightness-0 invert"
        />
      </Link>
      <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[calc(8px*var(--hero-scale))] xl:flex">
        {navLinks.map((label) => (
          <a
            key={label}
            href="#"
            className="whitespace-nowrap px-[calc(20px*var(--hero-scale))] py-[calc(10px*var(--hero-scale))] text-[calc(16px*var(--hero-scale))] font-medium uppercase text-white/80 transition-colors hover:text-white"
          >
            {label}
          </a>
        ))}
      </div>
      <div className="flex shrink-0 items-center gap-[calc(8px*var(--hero-scale))] sm:gap-[calc(12px*var(--hero-scale))]">
        <button
          type="button"
          aria-label="Rewards"
          className="flex h-[calc(44px*var(--hero-scale))] w-[calc(44px*var(--hero-scale))] shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
        >
          <img src="/uploads/Icon-krown.svg" alt="" className="h-[calc(20px*var(--hero-scale))] w-[calc(20px*var(--hero-scale))]" />
        </button>
        <a
          href="#"
          className="hidden h-[calc(44px*var(--hero-scale))] shrink-0 items-center gap-[calc(8px*var(--hero-scale))] whitespace-nowrap rounded-full bg-white/10 px-[calc(20px*var(--hero-scale))] text-[calc(16px*var(--hero-scale))] font-medium uppercase text-white transition-colors hover:bg-white/20 sm:flex"
        >
          <img
            src="/uploads/Icon-download.svg"
            alt=""
            className="h-[calc(20px*var(--hero-scale))] w-[calc(20px*var(--hero-scale))] brightness-0 invert"
          />
          Upload
        </a>
        <a
          href="#"
          className="whitespace-nowrap px-[calc(16px*var(--hero-scale))] text-[calc(16px*var(--hero-scale))] font-medium uppercase text-white transition-colors hover:text-white/80"
        >
          Sign In
        </a>
      </div>
    </div>
  );
}
