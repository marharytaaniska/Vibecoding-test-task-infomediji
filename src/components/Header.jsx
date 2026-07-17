const navLinks = ["DeoVR User", "DeoVR Developer", "Documentation", "Release Notes"];

export default function Header() {
  return (
    <div className="sticky top-0 z-[100] flex h-[84px] flex-row items-center justify-between gap-6 bg-white px-8">
      <div className="flex items-center gap-16">
        <img src="/assets/logo-wordmark.png" alt="DeoVR" className="h-[34px] w-auto object-contain" />
        <div className="flex items-center gap-2">
          {navLinks.map((label) => (
            <a
              key={label}
              href="#"
              className="whitespace-nowrap px-6 py-2.5 text-sm font-semibold text-[rgb(86,107,138)]"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Rewards"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgb(255,90,138)] transition-colors hover:bg-[rgb(253,33,113)]"
        >
          <img src="/uploads/Icon-krown.svg" alt="" className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="flex h-10 items-center gap-2 rounded-[100px] bg-[rgb(240,245,255)] px-5 py-1 font-sans text-sm font-semibold text-[rgb(63,78,100)] transition-colors hover:bg-[rgb(226,228,233)]"
        >
          <img src="/uploads/Icon-download.svg" alt="" className="h-5 w-5" />
          Upload
        </button>
        <a href="#" className="w-[94px] box-border px-2 py-2.5 text-center text-sm font-semibold text-[rgb(63,78,100)]">
          Sign In
        </a>
      </div>
    </div>
  );
}
