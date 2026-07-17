import { useState } from "react";

const faqs = [
  {
    q: "What is DeoVR Premium?",
    a: "DeoVR Premium gives you access to the full Premium video library during your active subscription.",
  },
  {
    q: "Which headsets does DeoVR support?",
    a: "Meta Quest, Pico, PC VR headsets via SteamVR, and most Android-based standalone devices.",
  },
  {
    q: "Can I stream my own videos?",
    a: "Yes — paste a direct video link or connect a local network share and DeoVR streams it instantly.",
  },
  {
    q: "Is DeoVR really free?",
    a: "The core player is free forever. Premium only unlocks the curated Premium content library.",
  },
  {
    q: "Does DeoVR work offline?",
    a: "Downloaded videos play fully offline; streaming features require an internet connection.",
  },
];

export default function Faq() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="mx-[217px] mt-[160px] flex items-start gap-6">
      <div className="flex w-[550px] shrink-0 flex-col justify-center gap-8">
        <span className="text-[48px] leading-none font-semibold tracking-[-0.04em]">Frequently asked questions</span>
        <span className="text-base leading-[1.4] font-normal text-[rgb(63,78,100)]">Everything you need to know before you jump in</span>
      </div>
      <div className="flex flex-1 flex-col gap-4">
        {faqs.map((f, i) => {
          const isOpen = i === openFaq;
          return (
            <div
              key={f.q}
              onClick={() => setOpenFaq(isOpen ? -1 : i)}
              className="box-border cursor-pointer rounded-3xl p-6"
              style={{ background: isOpen ? "rgb(244,248,255)" : "transparent" }}
            >
              <div className="flex items-center gap-4">
                <span className="flex-1 text-xl leading-none font-semibold tracking-[-0.04em] text-[rgb(29,36,46)]">{f.q}</span>
                <img
                  src={isOpen ? "/uploads/Icon-arrow-up.svg" : "/uploads/Icon-arrow-down-c4753ef2.svg"}
                  alt=""
                  className="h-5 w-5 shrink-0"
                />
              </div>
              {isOpen && (
                <span className="mt-5 block text-sm leading-[1.4] font-normal text-[rgb(86,107,138)]">{f.a}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
