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
    title: "Rich color settings",
    desc: "Anything you need from contrast to brightness, from saturation to hue and sharpness",
    icon: "/assets/icon-gigabit.svg",
    bg: null,
    orderMobile: "order-3 min-[375px]:order-none min-[1025px]:order-3",
  },
  {
    title: "Switch between \nback-ends",
    desc: "Windows Media Foundation doesn’t play? Install codec pack and play with DirectShow to max out your GPU",
    icon: "/assets/icon-enhancement.svg",
    bg: "/assets/bg-enhancement-card.jpg",
    orderMobile: "order-2 min-[375px]:order-none min-[1025px]:order-2",
  },
  {
    title: "Numerous adjustments",
    desc: "Horizontal and vertical offsets, zoom, tilt, height and many more",
    icon: "/assets/icon-sync.svg",
    bg: "/assets/bg-sync-card.jpg",
    orderMobile: "order-4 min-[375px]:order-none min-[1025px]:order-4",
  },
  {
    title: "Transformable",
    desc: "Reposition windows, hide and pin them, drag them around to make your own interface",
    icon: "/assets/icon-private.svg",
    bg: null,
    orderMobile: "order-5 min-[375px]:order-none min-[1025px]:order-5",
  },
];

export default function Features() {
  return (
    <div className="mt-16 w-full sm:mt-[100px] md:mt-[100px] lg:mt-[160px]">
      <div className="mx-auto flex w-full max-w-[1486px] flex-col items-center gap-8 px-4 sm:gap-12 sm:px-5 md:px-8">
        <div className="flex w-full max-w-[1100px] flex-col items-center gap-5 text-center sm:gap-8">
          <span className="text-[24px] leading-none font-semibold tracking-[-0.04em] sm:text-[36px] lg:text-[48px]">Swiss Army knife of VR video players</span>
          <span className="text-sm font-normal text-[rgb(63,78,100)] md:text-base">Supports any formats, subtitles and audio tracks</span>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 min-[375px]:grid-cols-2 sm:gap-6 min-[1025px]:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className={`relative box-border flex h-auto flex-col justify-between gap-4 overflow-hidden rounded-3xl bg-[rgb(244,248,255)] p-4 sm:h-[250px] sm:gap-0 sm:p-8 ${f.orderMobile ?? ""}`}
              style={f.bg ? { backgroundImage: `url('${f.bg}')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" } : undefined}
            >
              <div className="static flex h-10 w-10 items-center justify-center rounded-xl bg-white sm:absolute sm:top-3 sm:right-3 sm:h-12 sm:w-12 lg:h-16 lg:w-16">
                <img src={f.icon} className="h-5 w-5 lg:h-7 lg:w-7" alt="" />
              </div>
              <span className="w-full whitespace-pre-line text-[18px] leading-none font-semibold tracking-[-0.04em] text-[rgb(86,107,138)] sm:w-[calc(100%-88px)] sm:text-[28px] lg:text-[32px]">
                {f.title}
              </span>
              <span className="w-full max-w-[300px] text-sm leading-[1.4] font-normal text-[rgb(86,107,138)]">{f.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
