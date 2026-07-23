import { Link } from "react-router-dom";

const navLinks = ["DeoVR User", "DeoVR Developer", "Documentation", "Release Notes"];

export default function HeroVideoHeader() {
  return (
    <div
      id="site-header"
      className="fixed left-[round(calc(24px*var(--hero-scale)),1px)] right-[round(calc(24px*var(--hero-scale)),1px)] top-[round(calc(16px*var(--hero-scale)),1px)] z-[100] flex h-[round(calc(84px*var(--hero-scale)),1px)] items-center justify-between gap-[round(calc(8px*var(--hero-scale)),1px)] rounded-[round(calc(24px*var(--hero-scale)),1px)] bg-white/5 px-[round(calc(32px*var(--hero-scale)),1px)] backdrop-blur-[round(calc(32px*var(--hero-scale)),1px)]"
    >
      <Link to="/" className="shrink-0">
        <img
          src="/assets/logo-wordmark.png"
          alt="DeoVR"
          className="h-[round(calc(34px*var(--hero-scale)),1px)] w-auto object-contain brightness-0 invert"
        />
      </Link>
      <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-[round(calc(8px*var(--hero-scale)),1px)]">
        {navLinks.map((label) => (
          <a
            key={label}
            href="#"
            className="whitespace-nowrap px-[round(calc(20px*var(--hero-scale)),1px)] py-[round(calc(10px*var(--hero-scale)),1px)] text-[round(calc(16px*var(--hero-scale)),1px)] font-medium uppercase text-white/80 transition-colors hover:text-white"
          >
            {label}
          </a>
        ))}
      </div>
      <div className="flex shrink-0 items-center gap-[round(calc(8px*var(--hero-scale)),1px)] sm:gap-[round(calc(12px*var(--hero-scale)),1px)]">
        <button
          type="button"
          aria-label="Rewards"
          className="flex h-[round(calc(44px*var(--hero-scale)),1px)] w-[round(calc(44px*var(--hero-scale)),1px)] shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
        >
          <img src="/uploads/Icon-krown.svg" alt="" className="h-[round(calc(20px*var(--hero-scale)),1px)] w-[round(calc(20px*var(--hero-scale)),1px)]" />
        </button>
        <a
          href="#"
          className="flex h-[round(calc(44px*var(--hero-scale)),1px)] shrink-0 items-center gap-[round(calc(8px*var(--hero-scale)),1px)] whitespace-nowrap rounded-full bg-white/10 px-[round(calc(20px*var(--hero-scale)),1px)] text-[round(calc(16px*var(--hero-scale)),1px)] font-medium uppercase text-white transition-colors hover:bg-white/20"
        >
          <img
            src="/uploads/Icon-download.svg"
            alt=""
            className="h-[round(calc(20px*var(--hero-scale)),1px)] w-[round(calc(20px*var(--hero-scale)),1px)] brightness-0 invert"
          />
          Upload
        </a>
        <a
          href="#"
          className="whitespace-nowrap px-[round(calc(16px*var(--hero-scale)),1px)] text-[round(calc(16px*var(--hero-scale)),1px)] font-medium uppercase text-white transition-colors hover:text-white/80"
        >
          Sign In
        </a>
      </div>
    </div>
  );
}
