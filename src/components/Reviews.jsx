export default function Reviews() {
  return (
    <div className="mt-[160px] flex flex-col items-center gap-12">
      <div className="flex w-[1100px] flex-col items-center gap-8 text-center">
        <span className="text-[48px] leading-none font-semibold tracking-[-0.04em]">What people say about DeoVR</span>
        <span className="text-base font-normal text-[rgb(63,78,100)]">Nothing says more than a happy users</span>
      </div>

      <div className="relative h-[400px] w-[1920px] overflow-hidden">
        <div className="absolute left-[-113px] top-0 flex h-[400px] w-[2146px] items-center gap-4">
          <div className="h-[275px] w-[275px] shrink-0 rounded-full bg-[rgb(219,221,225)]" />
          <div className="h-[275px] w-[275px] shrink-0 rounded-full bg-[rgb(219,221,225)]" />
          <div className="h-[275px] w-[275px] shrink-0 rounded-full bg-[rgb(219,221,225)]" />
          <div className="relative h-[400px] w-[400px] shrink-0 rounded-full bg-[rgb(219,221,225)]">
            <img
              src="/uploads/glasses.png"
              alt=""
              className="pointer-events-none absolute left-1/2 top-12 h-[176px] w-[280px] -translate-x-1/2 object-contain"
            />
          </div>
          <div className="h-[275px] w-[275px] shrink-0 rounded-full bg-[rgb(219,221,225)]" />
          <div className="h-[275px] w-[275px] shrink-0 rounded-full bg-[rgb(219,221,225)]" />
          <div className="h-[275px] w-[275px] shrink-0 rounded-full bg-[rgb(219,221,225)]" />
        </div>
        <div
          className="pointer-events-none absolute left-0 top-0 h-[400px] w-[604px]"
          style={{ background: "linear-gradient(90deg, rgb(255,255,255) 17.55%, rgba(255,255,255,0) 98.15%)" }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 h-[400px] w-[604px]"
          style={{ background: "linear-gradient(270deg, rgb(255,255,255) 17.55%, rgba(255,255,255,0) 98.15%)" }}
        />
      </div>
    </div>
  );
}
