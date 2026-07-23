import { useEffect, useRef, useState } from "react";

const SCROLL_VIDEO_SRC = "/assets/hero-video-scroll.mp4";
const START_FRAME_IMAGE = "/assets/image 5.jpg";
const END_FRAME_IMAGE = "/assets/hero-video-scroll-end-frame.jpg";
const END_THRESHOLD = 0.999;
const PHASE_THRESHOLD = 0.35;
const PHASE_C_THRESHOLD = 0.7;
const FREE_DOWNLOAD_URL =
  "https://vibecoding-test-task-infomediji-14m2u3eyf-marharytaaniskazxc.vercel.app/#dont-think-twice";

// Each scene's text groups fade + slide up (opacity 0 -> 1, translateY(20px) -> 0)
// as their scene becomes active, with a small per-item stagger on the way in.
// The stagger only applies when appearing — applying it on the way out too
// would leave the outgoing scene's items lingering (and overlapping the next
// scene, which enters immediately) for as long as the last item's delay.
// Exit is quick (EXIT_DURATION_MS) with no delay, and entry is held back by
// EXIT_DURATION_MS + BLANK_GAP_MS so there's a brief beat with no text at all
// on screen, instead of the incoming scene appearing the instant the old one
// starts leaving.
const EXIT_DURATION_MS = 250;
const BLANK_GAP_MS = 150;
const ENTER_DELAY_MS = EXIT_DURATION_MS + BLANK_GAP_MS;
const ENTER_DURATION_MS = 600;
const STAGGER_MS = 90;
const itemStyle = () => ({
  opacity: 0,
  transform: "translateY(20px)",
  transitionProperty: "opacity, transform",
  transitionTimingFunction: "ease-out",
  transitionDuration: `${EXIT_DURATION_MS}ms`,
});

// Scroll-cue circles: 5% white fill with a 135deg gradient ring (50% white
// fading to 0%, top-left to bottom-right). Layering the gradient as a second
// background under the translucent fill let it bleed through into the whole
// interior (a low-alpha top layer doesn't fully mask what's behind it), so
// instead the ring is a separate absolutely-positioned layer whose gradient
// is clipped to just the 1px band via mask-composite — it never touches the
// interior at all, regardless of the fill's opacity.
function ScrollCueCircle({ className, children }) {
  return (
    <div className={`relative shrink-0 rounded-full ${className ?? ""}`}>
      <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-[5px]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          padding: "1px",
          background: "linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,255,255,0))",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-1">{children}</div>
    </div>
  );
}

function animateItems(refs, visible) {
  refs.current.forEach((el, index) => {
    if (!el) return;
    el.style.transitionDelay = visible ? `${ENTER_DELAY_MS + index * STAGGER_MS}ms` : "0ms";
    el.style.transitionDuration = visible ? `${ENTER_DURATION_MS}ms` : `${EXIT_DURATION_MS}ms`;
    el.style.opacity = visible ? "1" : "0";
    el.style.transform = visible ? "translateY(0px)" : "translateY(20px)";
  });
}

export default function ScrollVideo() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const videoRef = useRef(null);
  const endFrameRef = useRef(null);
  const phaseARef = useRef(null);
  const phaseBRef = useRef(null);
  const phaseCRef = useRef(null);
  const phaseAItemRefs = useRef([]);
  const phaseBItemRefs = useRef([]);
  const phaseCItemRefs = useRef([]);
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

  // Keep the page pinned to the first frame (shown via the video's poster)
  // until the video has loaded enough to scrub — otherwise the user can
  // scroll straight through the tall section before the scroll listener
  // below is even attached, which skips the video entirely. The actual
  // scrolling element here is <html>, not <body> (index.css only sets
  // overflow-x on html, leaving it as the default vertical scroller), so
  // locking body alone does nothing — html has to be locked too.
  useEffect(() => {
    if (isReady) return undefined;
    const html = document.documentElement;
    const { overflow: htmlOverflow } = html.style;
    const { overflow: bodyOverflow } = document.body.style;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      html.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
    };
  }, [isReady]);

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

      // The overlay reads as three scenes that crossfade through the clip
      // (title/stats, then the headset pitch, then the closing CTA over the
      // in-app frame), driven by the same scroll progress that scrubs the
      // video — no separate observer. Each scene's own text groups fade +
      // slide in via animateItems once their scene is active.
      const phaseCVisible = progress >= PHASE_C_THRESHOLD;
      const phaseBVisible = progress >= PHASE_THRESHOLD && !phaseCVisible;
      const phaseAVisible = !phaseBVisible && !phaseCVisible;
      if (phaseARef.current) phaseARef.current.style.pointerEvents = phaseAVisible ? "auto" : "none";
      if (phaseBRef.current) phaseBRef.current.style.pointerEvents = phaseBVisible ? "auto" : "none";
      if (phaseCRef.current) phaseCRef.current.style.pointerEvents = phaseCVisible ? "auto" : "none";
      animateItems(phaseAItemRefs, phaseAVisible);
      animateItems(phaseBItemRefs, phaseBVisible);
      animateItems(phaseCItemRefs, phaseCVisible);
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
        <div ref={phaseARef} className="absolute inset-0">
          <div
            ref={(el) => {
              phaseAItemRefs.current[0] = el;
            }}
            style={itemStyle()}
            className="absolute left-6 top-24 flex max-w-xl flex-col gap-6 sm:left-10 sm:top-28 lg:left-[round(calc(56px*var(--hero-scale)),1px)] lg:top-[round(calc(156px*var(--hero-scale)),1px)] lg:max-w-[round(calc(576px*var(--hero-scale)),1px)] lg:gap-[round(calc(32px*var(--hero-scale)),1px)]"
          >
            <h1 className="bg-[linear-gradient(106deg,#fff_14.34%,#CEE1FF_132.13%)] bg-clip-text text-4xl font-semibold leading-[1.05] tracking-tight text-transparent sm:text-5xl lg:text-[round(calc(104px*var(--hero-scale)),1px)] lg:leading-[0.85] lg:tracking-[-0.06em]">
              Most robust
              <br />
              and simple
              <br />
              VR player
            </h1>
            <span className="text-sm font-normal uppercase text-white/70 md:text-base lg:text-[round(calc(16px*var(--hero-scale)),1px)]">
              Download for free. Any platform.
            </span>
            <a
              href={FREE_DOWNLOAD_URL}
              className="flex h-11 w-fit items-center rounded-[100px] bg-[rgb(79,149,255)] px-6 py-1 font-sans text-[16px] font-medium uppercase text-white transition-colors hover:bg-[rgb(62,121,214)] lg:h-[round(calc(44px*var(--hero-scale)),1px)] lg:px-[round(calc(24px*var(--hero-scale)),1px)] lg:text-[round(calc(16px*var(--hero-scale)),1px)]"
            >
              Free Download
            </a>
          </div>

          <div
            ref={(el) => {
              phaseAItemRefs.current[1] = el;
            }}
            style={itemStyle()}
            className="absolute left-6 bottom-10 hidden max-w-sm flex-col gap-2 sm:left-10 sm:bottom-14 lg:left-[round(calc(56px*var(--hero-scale)),1px)] lg:flex lg:max-w-[round(calc(384px*var(--hero-scale)),1px)] lg:gap-[round(calc(20px*var(--hero-scale)),1px)]"
          >
            <h3 className="text-lg font-semibold text-white sm:text-xl lg:text-[round(calc(32px*var(--hero-scale)),1px)] lg:leading-[0.9] lg:tracking-[-0.06em]">
              Zero friction, from day one.
            </h3>
            <p className="text-xs uppercase text-white/50 sm:text-sm lg:text-[round(calc(16px*var(--hero-scale)),1px)]">
              Install in under 60 seconds — <span className="font-semibold text-white/90">no account</span>, no setup required.
            </p>
            <a href="#" className="text-xs font-semibold uppercase text-white sm:text-sm lg:text-[round(calc(16px*var(--hero-scale)),1px)]">
              Read more
            </a>
          </div>

          <div className="absolute right-6 top-24 bottom-10 hidden max-w-[280px] flex-col justify-between sm:right-10 lg:right-[round(calc(56px*var(--hero-scale)),1px)] lg:top-[round(calc(156px*var(--hero-scale)),1px)] lg:bottom-[round(calc(56px*var(--hero-scale)),1px)] lg:flex lg:max-w-[round(calc(280px*var(--hero-scale)),1px)]">
            <div
              ref={(el) => {
                phaseAItemRefs.current[2] = el;
              }}
              style={itemStyle()}
            >
              <div className="text-3xl font-semibold text-white lg:text-[round(calc(48px*var(--hero-scale)),1px)] lg:leading-[0.9] lg:tracking-[-0.06em]">
                10M+
              </div>
              <p className="mt-2 text-xs uppercase text-white/50 sm:text-sm lg:mt-[round(calc(20px*var(--hero-scale)),1px)] lg:text-[round(calc(16px*var(--hero-scale)),1px)]">
                <span className="font-semibold text-white/90">Downloads worldwide</span> — and counting. Join a
                community that keeps growing every single day.
              </p>
            </div>
            <div
              ref={(el) => {
                phaseAItemRefs.current[3] = el;
              }}
              style={itemStyle()}
            >
              <div className="text-3xl font-semibold text-white lg:text-[round(calc(48px*var(--hero-scale)),1px)] lg:leading-[0.9] lg:tracking-[-0.06em]">
                500K+
              </div>
              <p className="mt-2 text-xs uppercase text-white/50 sm:text-sm lg:mt-[round(calc(20px*var(--hero-scale)),1px)] lg:text-[round(calc(16px*var(--hero-scale)),1px)]">
                <span className="font-semibold text-white/90">Monthly active users</span> streaming, exploring, and
                discovering new worlds inside DeoVR right now.
              </p>
            </div>
            <div
              ref={(el) => {
                phaseAItemRefs.current[4] = el;
              }}
              style={itemStyle()}
            >
              <div className="text-3xl font-semibold text-white lg:text-[round(calc(48px*var(--hero-scale)),1px)] lg:leading-[0.9] lg:tracking-[-0.06em]">
                190+
              </div>
              <p className="mt-2 text-xs uppercase text-white/50 sm:text-sm lg:mt-[round(calc(20px*var(--hero-scale)),1px)] lg:text-[round(calc(16px*var(--hero-scale)),1px)]">
                <span className="font-semibold text-white/90">Countries</span> where people trust DeoVR as their
                go-to VR player — from Tokyo to Toronto.
              </p>
            </div>
          </div>

          <div
            ref={(el) => {
              phaseAItemRefs.current[5] = el;
            }}
            style={itemStyle()}
            className="absolute left-1/2 bottom-8 hidden -translate-x-1/2 flex-col items-center gap-2 sm:bottom-12 sm:flex"
          >
            <ScrollCueCircle className="h-20 w-20 text-[11px] font-medium uppercase tracking-wide text-white sm:h-24 sm:w-24 lg:h-[round(calc(200px*var(--hero-scale)),1px)] lg:w-[round(calc(200px*var(--hero-scale)),1px)] lg:text-[round(calc(16px*var(--hero-scale)),1px)]">
              <span>Discover</span>
              <span aria-hidden="true">↓</span>
            </ScrollCueCircle>
          </div>
        </div>

        {/* Scene B: cross-platform headset pitch, fades in once the clip turns to profile */}
        <div ref={phaseBRef} className="absolute inset-0">
          <div className="absolute right-6 top-24 bottom-10 hidden max-w-lg flex-col justify-between sm:right-10 sm:top-28 lg:right-[round(calc(56px*var(--hero-scale)),1px)] lg:top-[round(calc(156px*var(--hero-scale)),1px)] lg:bottom-[round(calc(56px*var(--hero-scale)),1px)] lg:flex lg:max-w-[round(calc(672px*var(--hero-scale)),1px)]">
            <div>
              <h2
                ref={(el) => {
                  phaseBItemRefs.current[0] = el;
                }}
                style={itemStyle()}
                className="bg-[linear-gradient(106deg,#fff_14.34%,#CEE1FF_132.13%)] bg-clip-text text-3xl font-semibold leading-tight text-transparent sm:text-4xl lg:text-[round(calc(80px*var(--hero-scale)),1px)] lg:leading-[0.85] lg:tracking-[-0.06em]"
              >
                Built for every
                <br />
                headset
              </h2>
              <p
                ref={(el) => {
                  phaseBItemRefs.current[1] = el;
                }}
                style={itemStyle()}
                className="mt-4 text-xs uppercase text-white/50 sm:text-sm sm:mt-6 md:text-base lg:mt-[round(calc(32px*var(--hero-scale)),1px)] lg:text-[round(calc(16px*var(--hero-scale)),1px)]"
              >
                From <span className="font-semibold text-white/90">Quest</span> to{" "}
                <span className="font-semibold text-white/90">Vision Pro</span>, from{" "}
                <span className="font-semibold text-white/90">PSVR2</span> to{" "}
                <span className="font-semibold text-white/90">Pico</span> — DeoVR runs everywhere your favorite
                headset does. No plugins, no conversion, no waiting. Just put it on and press play.
              </p>
              <div
                ref={(el) => {
                  phaseBItemRefs.current[2] = el;
                }}
                style={itemStyle()}
                className="mt-6 flex gap-10 sm:gap-14 lg:mt-[round(calc(80px*var(--hero-scale)),1px)] lg:gap-[round(calc(56px*var(--hero-scale)),1px)]"
              >
                <div>
                  <div className="text-2xl font-semibold text-white sm:text-3xl lg:text-[round(calc(48px*var(--hero-scale)),1px)] lg:leading-[0.9] lg:tracking-[-0.06em]">
                    8K / 120 FPS
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-wide text-white/50 sm:text-sm lg:mt-[round(calc(20px*var(--hero-scale)),1px)] lg:text-[round(calc(16px*var(--hero-scale)),1px)]">
                    Passthrough &amp; high-fidelity streaming supported
                  </p>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-white sm:text-3xl lg:text-[round(calc(48px*var(--hero-scale)),1px)] lg:leading-[0.9] lg:tracking-[-0.06em]">
                    6+
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-wide text-white/50 sm:text-sm lg:mt-[round(calc(20px*var(--hero-scale)),1px)] lg:text-[round(calc(16px*var(--hero-scale)),1px)]">
                    Headset platforms supported
                  </p>
                </div>
              </div>
            </div>

            <div
              ref={(el) => {
                phaseBItemRefs.current[3] = el;
              }}
              style={itemStyle()}
              className="flex flex-col items-start gap-2"
            >
              <ScrollCueCircle className="h-20 w-20 text-center text-[11px] font-medium uppercase tracking-wide text-white sm:h-24 sm:w-24 lg:h-[round(calc(200px*var(--hero-scale)),1px)] lg:w-[round(calc(200px*var(--hero-scale)),1px)] lg:text-[round(calc(16px*var(--hero-scale)),1px)]">
                <span>Keep scrolling</span>
                <span aria-hidden="true">↓</span>
              </ScrollCueCircle>
            </div>
          </div>
        </div>

        {/* Scene C: closing CTA over the in-app frame, fades in near the end of the clip */}
        <div ref={phaseCRef} className="absolute inset-0">
          <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-6 px-6 text-center sm:bottom-14 lg:bottom-[round(calc(56px*var(--hero-scale)),1px)] lg:gap-[round(calc(32px*var(--hero-scale)),1px)]">
            <h2
              ref={(el) => {
                phaseCItemRefs.current[0] = el;
              }}
              style={itemStyle()}
              className="bg-[linear-gradient(106deg,#fff_14.34%,#CEE1FF_132.13%)] bg-clip-text text-4xl font-semibold leading-[1.05] tracking-tight text-transparent sm:text-5xl lg:text-[round(calc(80px*var(--hero-scale)),1px)] lg:leading-[0.85] lg:tracking-[-0.06em]"
            >
              This is what VR
              <br />
              should feel like
            </h2>
            <span
              ref={(el) => {
                phaseCItemRefs.current[1] = el;
              }}
              style={itemStyle()}
              className="text-sm font-normal uppercase text-white/70 md:text-base lg:text-[round(calc(16px*var(--hero-scale)),1px)]"
            >
              Thousands of worlds. One seamless interface.
            </span>
            <a
              ref={(el) => {
                phaseCItemRefs.current[2] = el;
              }}
              style={itemStyle()}
              href={FREE_DOWNLOAD_URL}
              className="flex h-11 w-fit items-center rounded-[100px] bg-[rgb(79,149,255)] px-6 py-1 font-sans text-[16px] font-medium uppercase text-white transition-colors hover:bg-[rgb(62,121,214)] lg:h-[round(calc(44px*var(--hero-scale)),1px)] lg:px-[round(calc(24px*var(--hero-scale)),1px)] lg:text-[round(calc(16px*var(--hero-scale)),1px)]"
            >
              Free Download
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
