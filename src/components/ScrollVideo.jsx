import { useEffect, useRef, useState } from "react";

const SCROLL_VIDEO_SRC = "/assets/intro.mp4";

export default function ScrollVideo() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const videoRef = useRef(null);
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
      const progress = scrollable > 0 ? Math.min(Math.max(-sectionRect.top / scrollable, 0), 1) : 0;

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
      <div ref={stickyRef} className="absolute left-0 top-0 w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={SCROLL_VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
