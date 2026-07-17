const stats = [
  { value: "52,200+", label: "Videos ready to stream, no setup required" },
  { value: "6+", label: "Headset platforms supported" },
  { value: "$0", label: "Free forever, no subscription needed" },
];

export default function Stats() {
  return (
    <div className="mx-[217px] mt-[160px] flex h-[90px] flex-row items-center gap-6">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-1 flex-col items-center gap-5">
          <span className="text-center text-[48px] leading-none font-semibold tracking-[-0.04em]">{s.value}</span>
          <span className="text-center text-base font-normal text-[rgb(63,78,100)]">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
