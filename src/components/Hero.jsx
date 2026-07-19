import { useEffect, useRef, useState } from "react";

const HERO_IMAGE = "/assets/wave2.jpg";
const HERO_VIDEO = "/assets/Wave video.mp4";

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const total = Math.floor(seconds);
  const minutes = Math.floor(total / 60);
  const secs = total % 60;
  return `${minutes}:${String(secs).padStart(2, "0")}`;
}

export default function Hero() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const onLoadedMetadata = () => setDuration(video.duration);
    const onEnded = () => setIsPlaying(false);

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) return undefined;
    const video = videoRef.current;
    let rafId;

    const tick = () => {
      setCurrentTime(video.currentTime);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="relative m-4 flex h-auto flex-col items-center gap-8 overflow-hidden rounded-[24px] box-border px-4 pt-12 pb-0 bg-[rgb(215,215,215)] sm:m-6 sm:gap-10 sm:px-6 sm:pt-16 sm:rounded-[32px] lg:m-8 lg:gap-12 lg:px-8 lg:pt-24"
      style={{ backgroundImage: "url('/uploads/Image bg.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
    >
      <div className="relative flex w-full max-w-[515px] flex-col items-center gap-6 px-2 text-center sm:gap-8">
        <span className="whitespace-pre text-[24px] leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[36px] sm:leading-none sm:tracking-[-0.04em] lg:text-[48px]">
          {"Most robust and simple\nVR player"}
        </span>
        <span className="text-sm font-normal text-[rgb(63,78,100)] md:text-base">Download for free. Any platform.</span>
        <a
          href="#dont-think-twice"
          className="flex h-11 items-center rounded-[100px] bg-[rgb(79,149,255)] px-6 py-1 font-sans text-[15px] font-semibold text-white transition-colors hover:bg-[rgb(62,121,214)]"
        >
          Free Download
        </a>
      </div>

      {/* Stage is a fixed 960x540 image; the frame only shows the top 420px, so the
          bottom 120px (where the player's control row sits) bleeds past the card edge. */}
      <div className="relative w-full max-w-[960px] overflow-hidden rounded-t-[16px] h-[147px] sm:h-[210px] sm:rounded-t-[24px] md:h-[273px] lg:h-[357px] xl:h-[420px]">
        <div className="absolute left-1/2 top-0 h-[540px] w-[960px] origin-top -translate-x-1/2 scale-[0.35] sm:scale-[0.5] md:scale-[0.65] lg:scale-[0.85] xl:scale-100">
          <video
            ref={videoRef}
            src={HERO_VIDEO}
            poster={HERO_IMAGE}
            playsInline
            onClick={togglePlay}
            className="absolute inset-0 h-full w-full cursor-pointer rounded-t-[16px] object-cover shadow-[0_24px_48px_rgba(29,36,46,0.22)] sm:rounded-t-[24px]"
          />

          <div className="animate-hero-player-float absolute left-1/2 bottom-[166px] z-10 box-border flex w-[840px] flex-col gap-3.5 rounded-[20px] bg-black/20 px-[26px] py-5 backdrop-blur-[32px]">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-[13px] font-medium text-white/[0.65]">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="relative h-1.5 rounded-[3px] bg-white/[0.22]">
                <div className="absolute left-0 top-0 h-full rounded-[3px] bg-white" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex w-[180px] items-center gap-2.5">
                <button type="button" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"} className="flex shrink-0 items-center justify-center">
                  <img src={isMuted ? "/uploads/volume_off.svg" : "/uploads/volume_up.svg"} className="h-5 w-5" alt="" />
                </button>
                <div className="relative h-1 flex-1 rounded-sm bg-white/[0.28]">
                  <div className="absolute left-0 top-0 h-full rounded-sm bg-white" style={{ width: isMuted ? "0%" : "55%" }} />
                </div>
              </div>
              <div className="flex items-center gap-[22px]">
                <img src="/uploads/backward_15.svg" className="h-[26px] w-[26px]" alt="Rewind 15 seconds" />
                <button type="button" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} className="flex h-6 w-6 items-center justify-center">
                  {isPlaying ? (
                    <img src="/uploads/pause.svg" className="h-6 w-6" alt="" />
                  ) : (
                    <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6" fill="white" aria-hidden="true">
                      <path d="M7 5.6c0-1.05 1.15-1.7 2.05-1.15l10.4 6.4c.85.53.85 1.77 0 2.3l-10.4 6.4C8.15 19.9 7 19.25 7 18.2z" />
                    </svg>
                  )}
                </button>
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
    </div>
  );
}
