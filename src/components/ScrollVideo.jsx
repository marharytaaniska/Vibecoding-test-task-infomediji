import { useEffect, useRef, useState } from "react";

const SCROLL_VIDEO_SRC = "/assets/intro.mp4";
const START_FRAME_IMAGE = "/assets/image 5.jpg";
const END_FRAME_IMAGE = "/assets/image 8.jpg";
const END_THRESHOLD = 0.999;

export default function ScrollVideo() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const videoRef = useRef(null);
  const endFrameRef = useRef(null);
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
  // that scrubs the video's currentTime.
  useEffect(() => {
    if (!isReady) return undefined;
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const video = videoRef.current;
    if (!section || !sticky || !video) return undefined;

    let rafId = null;

    const updateFrame = () => {
      rafId = null;
      const header = document.getElementById("site-header");
      const headerHeight = header ? header.offsetHeight : 0;
      const viewportHeight = window.innerHeight;
      const stickyHeight = viewportHeight - headerHeight;

      const sectionRect = section.getBoundingClientRect();
      const scrollable = sectionRect.height - stickyHeight;
      // The section is pinned once its top reaches headerHeight (not 0), so
      // that offset has to be added back in or progress caps out short of 1.
      const progress = scrollable > 0 ? Math.min(Math.max((headerHeight - sectionRect.top) / scrollable, 0), 1) : 0;

      sticky.style.height = `${stickyHeight}px`;
      if (sectionRect.top > headerHeight) {
        sticky.style.position = "absolute";
        sticky.style.top = "0px";
        sticky.style.bottom = "";
      } else if (sectionRect.bottom < headerHeight + stickyHeight) {
        sticky.style.position = "absolute";
        sticky.style.top = "";
        sticky.style.bottom = "0px";
      } else {
        sticky.style.position = "fixed";
        sticky.style.top = `${headerHeight}px`;
        sticky.style.bottom = "";
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
      <div
        ref={stickyRef}
        className="absolute left-0 top-0 h-[calc(100vh-72px)] w-full overflow-hidden bg-black sm:h-[calc(100vh-84px)]"
      >
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
      </div>
    </section>
  );
}
