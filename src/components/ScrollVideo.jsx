import { useEffect, useRef, useState } from "react";

const SCROLL_VIDEO_SRC = "/assets/hero-video-scroll.mp4";
const START_FRAME_IMAGE = "/assets/image 5.jpg";
const END_FRAME_IMAGE = "/assets/hero-video-scroll-end-frame.jpg";
const END_THRESHOLD = 0.999;
const PHASE_THRESHOLD = 0.45;
const FREE_DOWNLOAD_URL =
  "https://vibecoding-test-task-infomediji-14m2u3eyf-marharytaaniskazxc.vercel.app/#dont-think-twice";

export default function ScrollVideo() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const videoRef = useRef(null);
  const endFrameRef = useRef(null);
  const phaseARef = useRef(null);
  const phaseBRef = useRef(null);
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

      // The overlay reads as two scenes that crossfade partway through the
      // clip (title/stats, then the headset pitch), driven by the same
      // scroll progress that scrubs the video — no separate observer.
      const phaseBVisible = progress >= PHASE_THRESHOLD;
      if (phaseARef.current) {
        phaseARef.current.style.opacity = phaseBVisible ? "0" : "1";
        phaseARef.current.style.pointerEvents = phaseBVisible ? "none" : "auto";
      }
      if (phaseBRef.current) {
        phaseBRef.current.style.opacity = phaseBVisible ? "1" : "0";
        phaseBRef.current.style.pointerEvents = phaseBVisible ? "auto" : "none";
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

        {/* Scene A: hero title, download CTA, onboarding blurb and headline stats */}
        <div ref={phaseARef} style={{ opacity: 1, transition: "opacity 0.6s ease-out" }} className="absolute inset-0">
          <div className="absolute left-6 top-24 flex max-w-xl flex-col gap-6 sm:left-10 sm:top-28 lg:left-[56px] lg:top-[156px] lg:gap-8">
            <h1 className="bg-gradient-to-b from-white to-[#4F95FF] bg-clip-text text-4xl font-semibold leading-[1.05] tracking-tight text-transparent sm:text-5xl lg:text-[104px] lg:leading-[0.85] lg:tracking-[-0.06em]">
              Most robust
              <br />
              and simple
              <br />
              VR player
            </h1>
            <span className="text-sm font-normal uppercase text-white/70 md:text-base lg:text-[16px]">Download for free. Any platform.</span>
            <a
              href={FREE_DOWNLOAD_URL}
              className="flex h-11 w-fit items-center rounded-[100px] bg-[rgb(79,149,255)] px-6 py-1 font-sans text-[16px] font-medium uppercase text-white transition-colors hover:bg-[rgb(62,121,214)]"
            >
              Free Download
            </a>
          </div>

          <div className="absolute left-6 bottom-10 hidden max-w-sm flex-col gap-2 sm:left-10 sm:bottom-14 lg:left-[56px] lg:flex lg:gap-5">
            <h3 className="text-lg font-semibold text-white sm:text-xl lg:text-[32px] lg:leading-[0.9] lg:tracking-[-0.06em]">
              Zero friction, from day one.
            </h3>
            <p className="text-xs uppercase text-white/50 sm:text-sm lg:text-[16px]">
              Install in under 60 seconds — <span className="font-semibold text-white/90">no account</span>, no setup required.
            </p>
            <a href="#" className="text-xs font-semibold uppercase text-white sm:text-sm lg:text-[16px]">
              Read more
            </a>
          </div>

          <div className="absolute right-6 top-24 bottom-10 hidden max-w-[280px] flex-col justify-between sm:right-10 lg:right-[56px] lg:top-[156px] lg:bottom-[56px] lg:flex">
            <div>
              <div className="text-3xl font-semibold text-white lg:text-[48px] lg:leading-[0.9] lg:tracking-[-0.06em]">
                10M+
              </div>
              <p className="mt-2 text-xs uppercase text-white/50 sm:text-sm lg:mt-5 lg:text-[16px]">
                <span className="font-semibold text-white/90">Downloads worldwide</span> — and counting. Join a
                community that keeps growing every single day.
              </p>
            </div>
            <div>
              <div className="text-3xl font-semibold text-white lg:text-[48px] lg:leading-[0.9] lg:tracking-[-0.06em]">
                500K+
              </div>
              <p className="mt-2 text-xs uppercase text-white/50 sm:text-sm lg:mt-5 lg:text-[16px]">
                <span className="font-semibold text-white/90">Monthly active users</span> streaming, exploring, and
                discovering new worlds inside DeoVR right now.
              </p>
            </div>
            <div>
              <div className="text-3xl font-semibold text-white lg:text-[48px] lg:leading-[0.9] lg:tracking-[-0.06em]">
                190+
              </div>
              <p className="mt-2 text-xs uppercase text-white/50 sm:text-sm lg:mt-5 lg:text-[16px]">
                <span className="font-semibold text-white/90">Countries</span> where people trust DeoVR as their
                go-to VR player — from Tokyo to Toronto.
              </p>
            </div>
          </div>

          <div className="absolute left-1/2 bottom-8 hidden -translate-x-1/2 flex-col items-center gap-2 sm:bottom-12 sm:flex">
            <div className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-full border border-white/20 bg-white/5 text-[11px] font-medium uppercase tracking-wide text-white backdrop-blur-sm sm:h-24 sm:w-24 lg:h-[200px] lg:w-[200px] lg:text-[16px]">
              <span>Discover</span>
              <span aria-hidden="true">↓</span>
            </div>
          </div>
        </div>

        {/* Scene B: cross-platform headset pitch, fades in once the clip turns to profile */}
        <div ref={phaseBRef} style={{ opacity: 0, transition: "opacity 0.6s ease-out" }} className="absolute inset-0">
          <div className="absolute right-6 top-24 hidden max-w-lg flex-col sm:right-10 sm:top-28 lg:right-[56px] lg:top-[156px] lg:flex lg:max-w-2xl xl:right-24">
            <h2 className="bg-gradient-to-b from-white to-[#4F95FF] bg-clip-text text-3xl font-semibold leading-tight text-transparent sm:text-4xl lg:text-[80px] lg:leading-[0.85] lg:tracking-[-0.06em]">
              Built for every
              <br />
              headset
            </h2>
            <p className="mt-4 text-xs uppercase text-white/50 sm:text-sm sm:mt-6 md:text-base lg:mt-8 lg:text-[16px]">
              From <span className="font-semibold text-white/90">Quest</span> to{" "}
              <span className="font-semibold text-white/90">Vision Pro</span>, from{" "}
              <span className="font-semibold text-white/90">PSVR2</span> to{" "}
              <span className="font-semibold text-white/90">Pico</span> — DeoVR runs everywhere your favorite headset
              does. No plugins, no conversion, no waiting. Just put it on and press play.
            </p>
            <div className="mt-6 flex gap-10 sm:gap-14 lg:mt-20">
              <div>
                <div className="text-2xl font-semibold text-white sm:text-3xl">8K / 120 FPS</div>
                <p className="mt-1 text-xs uppercase tracking-wide text-white/50 sm:text-sm lg:mt-5 lg:text-[16px]">
                  Passthrough &amp; high-fidelity streaming supported
                </p>
              </div>
              <div>
                <div className="text-2xl font-semibold text-white sm:text-3xl">6+</div>
                <p className="mt-1 text-xs uppercase tracking-wide text-white/50 sm:text-sm lg:mt-5 lg:text-[16px]">
                  Headset platforms supported
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-col items-start gap-2">
              <div className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-full border border-white/20 bg-white/5 text-center text-[11px] font-medium uppercase tracking-wide text-white backdrop-blur-sm sm:h-24 sm:w-24 lg:h-[200px] lg:w-[200px] lg:text-[16px]">
                <span>Keep scrolling</span>
                <span aria-hidden="true">↓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
