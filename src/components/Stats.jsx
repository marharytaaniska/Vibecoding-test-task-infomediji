const stats = [
  { value: "52,200+", label: "Videos ready to stream, no setup required" },
  { value: "6+", label: "Headset platforms supported" },
  { value: "8K / 120 FPS", label: "Passthrough & high-fidelity streaming supported" },
];

export default function Stats() {
  return (
    <div className="mt-16 w-full sm:mt-[100px] md:mt-[100px] lg:mt-[160px]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-4 pb-4 sm:flex-row sm:items-start sm:gap-6 sm:px-6 sm:pb-0 md:px-8">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-1 flex-col items-center gap-5">
            <h2 className="text-center text-[24px] leading-none font-semibold tracking-[-0.04em] sm:text-[36px] lg:text-[48px]">{s.value}</h2>
            <span className="text-center text-sm font-normal text-[rgb(63,78,100)] md:text-base">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
