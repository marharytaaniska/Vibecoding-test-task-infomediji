import { useEffect, useRef, useState } from "react";

const navLinks = ["DeoVR User", "DeoVR Developer", "Documentation", "Release Notes"];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const header = headerRef.current;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;
    const headerPaddingRight = header.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      header.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      header.style.paddingRight = headerPaddingRight;
    };
  }, [menuOpen]);

  return (
    <>
      <div id="site-header" ref={headerRef} className="fixed inset-x-0 top-0 z-[100] w-full bg-white">
        <div className="relative z-[95] flex h-[72px] flex-row items-center justify-between gap-2 bg-white px-4 sm:h-[84px] sm:gap-6 sm:px-8">
          <div className="flex items-center gap-2 sm:gap-4 xl:gap-16">
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-[rgb(240,245,255)] xl:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="rgb(63,78,100)" strokeWidth="2" strokeLinecap="round">
                {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
            <img src="/assets/logo-wordmark.png" alt="DeoVR" className="h-[34px] w-auto shrink-0 object-contain" />
            <div className="hidden items-center gap-2 xl:flex">
              {navLinks.map((label) => (
                <a
                  key={label}
                  href="#"
                  className="whitespace-nowrap px-6 py-2.5 text-[15px] font-semibold"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              aria-label="Rewards"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[rgb(255,90,138)] transition-colors hover:bg-[rgb(253,33,113)]"
            >
              <img src="/uploads/Icon-krown.svg" alt="" className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-[100px] bg-[rgb(240,245,255)] px-3 py-1 font-sans text-[15px] font-semibold text-[rgb(63,78,100)] transition-colors hover:bg-[rgb(226,228,233)] sm:px-5"
            >
              <img src="/uploads/Icon-download.svg" alt="" className="h-5 w-5" />
              <span className="hidden sm:inline">Upload</span>
            </button>
            <a href="#" className="box-border hidden h-11 w-[86px] shrink-0 items-center justify-center whitespace-nowrap text-center text-[15px] font-semibold sm:flex">
              Sign In
            </a>
          </div>
        </div>

        <div
          className={`fixed inset-x-0 top-0 z-[90] flex h-screen flex-col overflow-y-auto bg-white transition-opacity duration-300 ease-in-out xl:hidden ${
            menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="flex flex-col gap-1 px-4 pt-[84px] pb-3 sm:px-8 sm:pt-[96px]">
            {navLinks.map((label) => (
              <a
                key={label}
                href="#"
                onClick={() => setMenuOpen(false)}
                className="flex min-h-11 items-center rounded-xl px-3 text-[15px] font-semibold transition-colors hover:bg-[rgb(240,245,255)]"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-1 px-4 pb-6 sm:px-8">
            <a
              href="#"
              onClick={() => setMenuOpen(false)}
              className="flex min-h-11 items-center rounded-xl px-3 text-[15px] font-semibold transition-colors hover:bg-[rgb(240,245,255)] sm:hidden"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
      <div className="h-[72px] w-full sm:h-[84px]" />
    </>
  );
}
