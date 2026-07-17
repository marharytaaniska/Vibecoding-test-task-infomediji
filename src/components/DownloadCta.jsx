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
    <div
      className="mx-[217px] mt-[160px] box-border flex justify-center rounded-[32px] bg-[rgb(217,217,217)] py-[100px]"
      style={{ backgroundImage: "url('/uploads/Don\\'t think twice.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
    >
      <div className="flex w-[1100px] flex-col items-center gap-12">
        <div className="flex w-[1100px] flex-col items-center gap-8 text-center">
          <span className="text-[48px] leading-none font-semibold tracking-[-0.04em]">Don't think twice</span>
          <span className="text-base font-normal text-[rgb(63,78,100)]">Download for free. Any platform</span>
          <div className="flex gap-2">
            {tagLabels.map((label, i) => (
              <button
                key={label}
                type="button"
                onClick={() => setSelectedTag(i)}
                className="h-9 rounded-[100px] bg-transparent px-4 py-1 font-sans text-sm font-semibold text-[rgb(125,146,175)]"
                style={{ boxShadow: `inset 0 0 0 1px ${i === selectedTag ? "rgb(125,146,175)" : "rgb(235,235,235)"}` }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex w-[700px] flex-col gap-4">
          {headsets.map((h) => (
            <div
              key={h.id}
              className="relative box-border flex h-[104px] items-center gap-4 overflow-hidden rounded-3xl bg-white py-6 pl-[130px] pr-6"
            >
              <img src={h.img} alt={h.alt} className="absolute left-0 top-0 h-[104px] w-[120px] object-contain" />
              <div className="flex flex-1 flex-col gap-4">
                <span className="text-xl leading-none font-semibold tracking-[-0.04em] text-[rgb(86,107,138)]">{h.title}</span>
                <span className="text-sm leading-[1.4] font-normal text-[rgb(86,107,138)]">{h.desc}</span>
              </div>
              <button
                type="button"
                className="h-11 w-[116px] shrink-0 rounded-[100px] bg-[rgb(79,149,255)] font-sans text-sm font-semibold text-white transition-colors hover:bg-[rgb(62,121,214)]"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
