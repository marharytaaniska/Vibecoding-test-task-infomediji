import { useEffect, useRef, useState } from "react";

const SCROLL_VIDEO_SRC = "/assets/hero-video-scroll.mp4";
const START_FRAME_IMAGE = "/assets/image 5.jpg";
const END_FRAME_IMAGE = "/assets/hero-video-scroll-end-frame.jpg";
const END_THRESHOLD = 0.999;
const STATS_THRESHOLD = 0.6;
const FREE_DOWNLOAD_URL =
  "https://vibecoding-test-task-infomediji-14m2u3eyf-marharytaaniskazxc.vercel.app/#dont-think-twice";

const statBlocks = [
  {
    value: "52,200+",
    label: "Videos ready to stream, no setup required",
    className: "top-24 right-6 max-w-[240px] text-right sm:top-28 sm:right-10 lg:right-16",
  },
  {
    value: "6+",
    label: "Headset platforms supported",
    className: "bottom-10 left-6 max-w-[220px] sm:bottom-14 sm:left-10 lg:left-16",
  },
  {
    value: "8K / 120 FPS",
    label: "Passthrough & high-fidelity streaming supported",
    className: "bottom-10 right-6 max-w-[240px] text-right sm:bottom-14 sm:right-10 lg:right-16",
  },
];

export default function ScrollVideo() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const videoRef = useRef(null);
  const endFrameRef = useRef(null);
  const statRefs = useRef([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    if (video.readyState >= 1) {
      setIsReady(true);
      return undefined;
    }
    const onLoadedMetadata = () => setIsReady(true);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    return () => video.removeEventListener("loadedmetadata", onLoadedMetadata);
  }, []);

  // position:sticky can't be used here: the site sets `overflow-x: hidden` on
  // html/body (to stop the coverflow carousel from causing mobile horizontal
  // scroll), which makes those elements the sticky containing block instead
  // of the viewport and silently breaks sticky positioning. Pin the video
  // manually with fixed/absolute instead, driven by the same scroll handler
  // that scrubs the video's currentTime. The header on this page is a
  // transparent overlay (no layout height of its own), so the video runs the
  // full viewport height with no offset to account for.
  useEffect(() => {
    if (!isReady) return undefined;
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const video = videoRef.current;
    if (!section || !sticky || !video) return undefined;

    let rafId = null;

    const updateFrame = () => {
      rafId = null;
      const viewportHeight = window.innerHeight;
      const sectionRect = section.getBoundingClientRect();
      const scrollable = sectionRect.height - viewportHeight;
      const progress = scrollable > 0 ? Math.min(Math.max(-sectionRect.top / scrollable, 0), 1) : 0;

      sticky.style.height = `${viewportHeight}px`;
      if (sectionRect.top > 0) {
        sticky.style.position = "absolute";
        sticky.style.top = "0px";
        sticky.style.bottom = "auto";
      } else if (sectionRect.bottom < viewportHeight) {
        // The container's `top-0` utility class stays applied even after
        // clearing the inline top, so an empty string here falls back to
        // that class's top:0 instead of unsetting it — which makes `bottom`
        // over-constrained and CSS ignores it, snapping the pinned frame
        // back to the section's top. Set top to an explicit "auto" so it
        // actually loses to bottom.
        sticky.style.position = "absolute";
        sticky.style.top = "auto";
        sticky.style.bottom = "0px";
      } else {
        sticky.style.position = "fixed";
        sticky.style.top = "0px";
        sticky.style.bottom = "auto";
      }

      const targetTime = progress * video.duration;
      if (Number.isFinite(targetTime) && Math.abs(video.currentTime - targetTime) > 0.01) {
        video.currentTime = targetTime;
      }

      // Seeking a compressed video to the exact last frame can land a hair
      // short or paint a soft/blocky frame, so once fully scrolled, swap in
      // the crisp end-frame still instead of trusting the video's own seek.
      if (endFrameRef.current) {
        endFrameRef.current.style.opacity = progress >= END_THRESHOLD ? "1" : "0";
      }

      // The stat callouts fade in once the subject turns to profile later in
      // the clip, and fade back out symmetrically on scroll-up.
      const statsVisible = progress >= STATS_THRESHOLD;
      statRefs.current.forEach((el) => {
        if (!el) return;
        el.style.opacity = statsVisible ? "1" : "0";
        el.style.transform = statsVisible ? "translateY(0px)" : "translateY(20px)";
      });
    };

    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(updateFrame);
    };

    updateFrame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isReady]);

  return (
    <section ref={sectionRef} className="relative h-[300vh] sm:h-[350vh]">
      <div ref={stickyRef} className="absolute left-0 top-0 h-screen w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={SCROLL_VIDEO_SRC}
          poster={START_FRAME_IMAGE}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <img
          ref={endFrameRef}
          src={END_FRAME_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-200"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/60" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/45" />

        <div className="absolute left-6 top-28 flex max-w-xl flex-col gap-6 sm:left-10 sm:top-32 lg:left-16">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Most robust and simple{" "}
            <span className="bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent">
              VR player.
            </span>
          </h1>
          <span className="text-sm font-normal text-white/70 md:text-base">Download for free. Any platform.</span>
          <a
            href={FREE_DOWNLOAD_URL}
            className="flex h-11 w-fit items-center rounded-[100px] bg-[rgb(79,149,255)] px-6 py-1 font-sans text-[15px] font-semibold text-white transition-colors hover:bg-[rgb(62,121,214)]"
          >
            Free Download
          </a>
        </div>

        {statBlocks.map((stat, index) => (
          <div
            key={stat.value}
            ref={(el) => {
              statRefs.current[index] = el;
            }}
            style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.5s ease-out, transform 0.5s ease-out" }}
            className={`absolute flex flex-col gap-2 ${stat.className}`}
          >
            <span className="text-4xl font-semibold text-white sm:text-5xl">{stat.value}</span>
            <span className="text-xs uppercase tracking-wide text-white/60 sm:text-sm">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
