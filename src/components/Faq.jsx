import { useState } from "react";

const faqs = [
  {
    q: "What happens if I don't include markers in the filename?",
    a: "The player will open the video as a flat 2D screen by default. You will have to manually adjust the stereo and projection settings every time using the player's in-app menu.",
  },
  {
    q: "Can I change video settings inside the player if tags are already in the filename?",
    a: "Once DeoVR auto-recognizes markers from the filename, it locks those specific parameters in the interface to prevent accidental distortion. If you want full manual control, simply remove the markers from the filename.",
  },
  {
    q: "What video formats support this feature?",
    a: "This method works across all video containers supported by the player. It is most commonly used with MP4 (H.264/H.265 codecs) and MKV files.",
  },
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
    <div className="mt-16 w-full sm:mt-[100px] md:mt-[100px]">
      <div className="mx-auto flex w-full max-w-[1486px] flex-col items-center gap-8 px-4 sm:gap-6 sm:px-6 md:px-8 min-[1025px]:flex-row min-[1025px]:items-start">
        <div className="flex w-full shrink-0 flex-col items-center justify-center gap-5 text-center sm:gap-8 min-[1025px]:w-[550px] min-[1025px]:items-start min-[1025px]:text-left">
          <span className="text-[24px] leading-none font-semibold tracking-[-0.04em] sm:text-[36px] lg:text-[48px]">Frequently asked questions</span>
          <span className="text-sm leading-[1.4] font-normal text-[rgb(63,78,100)] md:text-base">Everything you need to know before you jump in</span>
        </div>
        <div className="flex w-full flex-1 flex-col gap-4">
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
                <span className="flex-1 text-[16px] leading-none font-semibold tracking-[-0.04em] text-[rgb(29,36,46)] sm:text-xl">{f.q}</span>
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
    </div>
  );
}
