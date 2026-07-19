import { useState } from "react";

const tagLabels = ["Meta", "SteamVR", "Pico", "SideQuest", "Vision Pro", "Galaxy XR"];

const headsets = [
  {
    id: "quest3",
    img: "/uploads/Glasses-1.png",
    alt: "Meta Quest 3",
    title: "Meta Quest 3/3s (Beta)",
    desc: "Best performance & passthrough AI",
  },
  {
    id: "quest2",
    img: "/uploads/Glasses-2.png",
    alt: "Meta Quest 2",
    title: "Meta Quest 2",
    desc: "Reliable classic, still going strong",
  },
];

export default function DownloadCta() {
  const [selectedTag, setSelectedTag] = useState(0);

  return (
    <div id="dont-think-twice" className="mt-16 w-full scroll-mt-24 sm:mt-[100px] md:mt-[100px]">
      <div className="mx-auto w-full max-w-[1486px] px-4 sm:px-6 md:px-8">
        <div
          className="box-border flex justify-center rounded-[24px] bg-[rgb(217,217,217)] px-4 py-14 sm:rounded-[32px] sm:px-8 sm:py-16 lg:py-[100px]"
          style={{ backgroundImage: "url('/uploads/Don\\'t think twice.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
        >
          <div className="flex w-full max-w-[1100px] flex-col items-center gap-8 sm:gap-12">
            <div className="flex w-full flex-col items-center gap-5 text-center sm:gap-8">
              <span className="text-[24px] leading-none font-semibold tracking-[-0.04em] sm:text-[36px] lg:text-[48px]">Don't think twice</span>
              <span className="text-sm font-normal text-[rgb(63,78,100)] md:text-base">Download for free. Any platform</span>
              <div className="flex flex-wrap justify-center gap-2">
                {tagLabels.map((label, i) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setSelectedTag(i)}
                    className="h-11 rounded-[100px] bg-transparent px-4 py-1 font-sans text-[15px] font-semibold text-[rgb(125,146,175)] sm:h-9"
                    style={{ boxShadow: `inset 0 0 0 1px ${i === selectedTag ? "rgb(125,146,175)" : "rgb(235,235,235)"}` }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex w-full max-w-[700px] flex-col gap-4">
              {headsets.map((h) => (
                <div
                  key={h.id}
                  className="relative box-border flex h-auto min-h-[104px] flex-col items-center gap-4 overflow-hidden rounded-2xl bg-white p-6 text-center sm:flex-row sm:gap-4 sm:rounded-3xl sm:py-6 sm:pl-[130px] sm:pr-6 sm:text-left"
                >
                  <img
                    src={h.img}
                    alt={h.alt}
                    className="h-20 w-20 shrink-0 rounded-full object-cover sm:absolute sm:left-0 sm:top-0 sm:h-full sm:w-[120px] sm:rounded-none sm:object-contain"
                  />
                  <div className="flex flex-1 flex-col gap-2 sm:gap-4">
                    <span className="text-xl leading-none font-semibold tracking-[-0.04em] text-[rgb(86,107,138)]">{h.title}</span>
                    <span className="text-sm leading-[1.4] font-normal text-[rgb(86,107,138)]">{h.desc}</span>
                  </div>
                  <button
                    type="button"
                    className="h-11 w-full shrink-0 rounded-[100px] bg-[rgb(79,149,255)] font-sans text-[15px] font-semibold text-white transition-colors hover:bg-[rgb(62,121,214)] sm:w-[116px]"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
