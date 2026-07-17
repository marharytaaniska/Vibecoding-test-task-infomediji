const screenshots = [
  { id: "hero-shot-1", left: 38, rotate: -6, shadow: "0 24px 48px rgba(29,36,46,0.18)", img: "/videoframe_3075-mrowei50-jjw0.png" },
  { id: "hero-shot-2", left: 180, rotate: 4, shadow: "0 24px 48px rgba(29,36,46,0.22)", img: "/videoframe_3075-mrowdq8d-htzi.png" },
  { id: "hero-shot-3", left: 322, rotate: -1, shadow: "0 24px 48px rgba(29,36,46,0.26)", img: "/videoframe_3075-mroweomk-j55f.png" },
];

export default function Hero() {
  return (
    <div
      className="relative m-8 flex h-[800px] flex-col items-center gap-12 overflow-hidden rounded-[32px] box-border px-8 pt-[100px] pb-8 bg-[rgb(215,215,215)]"
      style={{ backgroundImage: "url('/uploads/Image bg.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
    >
      <div className="relative flex w-[515px] flex-col items-center gap-8 text-center">
        <span className="whitespace-pre-line text-[48px] leading-none font-semibold tracking-[-0.04em]">
          {"Most robust and simple\nVR player"}
        </span>
        <span className="text-base font-normal text-[rgb(63,78,100)]">Download for free. Any platform.</span>
        <button
          type="button"
          className="h-11 rounded-[100px] bg-[rgb(79,149,255)] px-6 py-1 font-sans text-sm font-semibold text-white transition-colors hover:bg-[rgb(62,121,214)]"
        >
          Free Download
        </button>
      </div>

      <div className="relative flex h-[486px] w-[960px] items-center justify-center">
        {screenshots.map((s) => (
          <div
            key={s.id}
            className="absolute top-9 h-[410px] w-[600px] rounded-[22px] bg-cover bg-center"
            style={{ left: s.left, transform: `rotate(${s.rotate}deg)`, boxShadow: s.shadow, backgroundImage: `url('${s.img}')` }}
          />
        ))}

        <div className="animate-hero-player-float absolute left-1/2 bottom-[26px] z-10 box-border flex w-[840px] flex-col gap-3.5 rounded-[20px] bg-black/20 px-[26px] py-5 backdrop-blur-[32px]">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-[13px] font-medium text-white/[0.65]">
              <span>2:35</span>
              <span>1:12:35</span>
            </div>
            <div className="relative h-1.5 rounded-[3px] bg-white/[0.22]">
              <div className="absolute left-0 top-0 h-full w-[28%] rounded-[3px] bg-white" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex w-[180px] items-center gap-2.5">
              <img src="/uploads/volume_up.svg" className="h-5 w-5 shrink-0" alt="" />
              <div className="relative h-1 flex-1 rounded-sm bg-white/[0.28]">
                <div className="absolute left-0 top-0 h-full w-[55%] rounded-sm bg-white" />
              </div>
            </div>
            <div className="flex items-center gap-[22px]">
              <img src="/uploads/backward_15.svg" className="h-[26px] w-[26px]" alt="Rewind 15 seconds" />
              <img src="/uploads/pause.svg" className="h-8 w-8" alt="Pause" />
              <img src="/uploads/forward_15.svg" className="h-[26px] w-[26px]" alt="Forward 15 seconds" />
            </div>
            <div className="flex w-[180px] items-center justify-end gap-[18px]">
              <img src="/uploads/skip_next.svg" className="h-5 w-5" alt="Skip" />
              <div className="h-5 w-px bg-white/[0.25]" />
              <img src="/uploads/passthrough-main.svg" className="h-[22px] w-[22px]" alt="Passthrough" />
              <img src="/uploads/haptics-toy-menu.svg" className="h-5 w-5" alt="Haptics" />
              <img src="/uploads/settings.svg" className="h-5 w-5" alt="Settings" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
