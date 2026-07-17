const features = [
  {
    title: "Built-in\nA-B loop",
    desc: "To go through your favorite moments, again and again.",
    icon: "/assets/icon-ab-loop.svg",
    bg: "/assets/bg-loop-card.jpg",
  },
  {
    title: "Stream anything\nfrom anywhere",
    desc: 'Simply copy a video address to your buffer and click "Stream" once in VR.',
    icon: "/assets/icon-stream-anywhere.svg",
    bg: null,
  },
  {
    title: "Switch between \nback-ends",
    desc: "Windows Media Foundation doesn’t play? Install codec pack and play with DirectShow to max out your GPU",
    icon: "/assets/icon-enhancement.svg",
    bg: "/assets/bg-enhancement-card.jpg",
  },
  {
    title: "Rich color settings",
    desc: "Anything you need from contrast to brightness, from saturation to hue and sharpness",
    icon: "/assets/icon-gigabit.svg",
    bg: null,
  },
  {
    title: "Numerous adjustments",
    desc: "Horizontal and vertical offsets, zoom, tilt, height and many more",
    icon: "/assets/icon-sync.svg",
    bg: "/assets/bg-sync-card.jpg",
  },
  {
    title: "Transformable",
    desc: "Reposition windows, hide and pin them, drag them around to make your own interface",
    icon: "/assets/icon-private.svg",
    bg: null,
  },
];

export default function Features() {
  return (
    <div className="mx-[217px] mt-[160px] flex flex-col items-center gap-12">
      <div className="flex w-[1100px] flex-col items-center gap-8 text-center">
        <span className="text-[48px] leading-none font-semibold tracking-[-0.04em]">Swiss Army knife of VR video players</span>
        <span className="text-base font-normal text-[rgb(63,78,100)]">Supports any formats, subtitles and audio tracks</span>
      </div>

      <div className="grid w-[1486px] grid-cols-3 gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="relative box-border flex h-[250px] flex-col justify-between overflow-hidden rounded-3xl bg-[rgb(244,248,255)] p-8"
            style={f.bg ? { backgroundImage: `url('${f.bg}')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" } : undefined}
          >
            <div className="absolute right-3 top-3 flex h-16 w-16 items-center justify-center rounded-xl bg-[rgba(92,109,134,0.2)]">
              <img src={f.icon} className="h-7 w-7" alt="" />
            </div>
            <span className="max-w-[350px] whitespace-pre-line text-[32px] leading-none font-semibold tracking-[-0.04em] text-[rgb(86,107,138)]">
              {f.title}
            </span>
            <span className="w-[300px] text-sm leading-[1.4] font-normal text-[rgb(86,107,138)]">{f.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
