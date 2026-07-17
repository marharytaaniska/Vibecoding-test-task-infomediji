import { useRef } from "react";

const tiles = [
  { id: "cat-1", img: "/videoframe_3075-mrowd2f8-oe38.png", label: null },
  { id: "cat-2", img: "/videoframe_3075-mrowcwqw-2b0m.png", label: "ASMR" },
  { id: "cat-3", img: "/videoframe_3075-mrowd8lz-20c6.png", label: null },
];

export default function Categories() {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <div className="mx-8 mt-[160px] flex flex-col items-center gap-12">
      <div className="flex w-[1100px] flex-col items-center gap-8 text-center">
        <span className="text-[48px] leading-none font-semibold tracking-[-0.04em]">Thousands of worlds. One player</span>
        <span className="text-base font-normal text-[rgb(63,78,100)]">Every genre, every platform, one place to watch it all</span>
      </div>

      <div className="relative h-[422px] w-[1856px]">
        <div ref={trackRef} className="flex h-full items-center gap-4 overflow-x-auto scroll-smooth">
          {tiles.map((t) => (
            <div
              key={t.id}
              className="relative h-full flex-1 rounded-[20px] bg-cover bg-center"
              style={{ backgroundImage: `url('${t.img}')` }}
            >
              {t.label && (
                <span
                  className="pointer-events-none absolute left-1/2 top-[190px] -translate-x-1/2 text-[32px] font-semibold tracking-[-0.04em] text-white"
                  style={{ textShadow: "0 2px 12px rgba(0,0,0,0.35)" }}
                >
                  {t.label}
                </span>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Previous category"
          onClick={() => scroll(-1)}
          className="absolute left-2 top-[189px] flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0_4px_12px_rgba(29,36,46,0.15)]"
        >
          <img src="/uploads/Icon-arrow-left.svg" alt="" className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next category"
          onClick={() => scroll(1)}
          className="absolute right-2 top-[189px] flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0_4px_12px_rgba(29,36,46,0.15)]"
        >
          <img src="/uploads/Icon-arrow-right.svg" alt="" className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex h-11 items-center gap-1 rounded-[100px] bg-transparent py-1 pl-6 pr-4 font-sans text-sm font-semibold text-[rgb(86,107,138)]"
        >
          View all categories
          <img src="/uploads/Icon-arrow-right-91a85975.svg" alt="" className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="h-11 rounded-[100px] bg-[rgb(255,94,153)] px-8 py-1 font-sans text-sm font-semibold text-white"
        >
          Free Download
        </button>
      </div>
    </div>
  );
}
