import { useEffect, useRef, useState } from "react";

const SAMPLE_VIDEO_SRC = "/assets/avatar animation.mp4";

const testimonials = [
  { id: "t1", name: "Sofia R.", avatar: "/assets/Background=True.jpg", videoSrc: SAMPLE_VIDEO_SRC },
  { id: "t2", name: "Marcus L.", avatar: "/assets/Background=True-1.jpg", videoSrc: SAMPLE_VIDEO_SRC },
  { id: "t3", name: "Elena K.", avatar: "/assets/Background=True-2.jpg", videoSrc: SAMPLE_VIDEO_SRC },
  { id: "t4", name: "Daniel W.", avatar: "/assets/Background=True-3.jpg", videoSrc: SAMPLE_VIDEO_SRC },
  { id: "t5", name: "Priya S.", avatar: "/assets/Background=True-4.jpg", videoSrc: SAMPLE_VIDEO_SRC },
  { id: "t6", name: "Jonas B.", avatar: "/assets/Background=True-5.jpg", videoSrc: SAMPLE_VIDEO_SRC },
  { id: "t7", name: "Amara O.", avatar: "/assets/Background=True-6.jpg", videoSrc: SAMPLE_VIDEO_SRC },
];

const ROTATE_INTERVAL_MS = 4000;

// The real list is short, so it's duplicated into enough copies that the row
// of circles always extends past both screen edges. This also pushes the
// point where the rotation math wraps around (see getOffset) far outside the
// visible/interactive range, so the wrap never appears as a visible jump.
const COPIES = 5;
const virtualTestimonials = Array.from({ length: COPIES }, (_, copy) =>
  testimonials.map((t) => ({ ...t, id: `${t.id}-c${copy}` }))
).flat();

const N = virtualTestimonials.length;
const HALF = Math.floor(N / 2);

const CENTER_SIZE_CLASS = "h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] lg:h-[400px] lg:w-[400px]";
const SIDE_SIZE_CLASS = "h-[138px] w-[138px] sm:h-[206px] sm:w-[206px] lg:h-[275px] lg:w-[275px]";

const CIRCLE_GAP_PX = 16;

function getOffset(index, centerIndex) {
  const raw = index - centerIndex;
  return (((raw + HALF) % N) + N) % N - HALF;
}

// Edge-to-edge spacing: the center circle is a different diameter than the
// side circles, so a uniform center-to-center slot would leave an uneven gap
// next to it. Instead each circle's translateX is the sum of every radius +
// gap between it and the center, using CSS vars so it adapts per breakpoint.
function getTranslateX(offset) {
  const dist = Math.abs(offset);
  if (dist === 0) return "0px";
  const sign = offset > 0 ? 1 : -1;
  const extraPairs = dist - 1;
  return `calc(${sign} * (var(--center-size) / 2 + ${CIRCLE_GAP_PX}px + var(--side-size) / 2 + ${extraPairs} * (var(--side-size) + ${CIRCLE_GAP_PX}px)))`;
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 sm:h-5 sm:w-5" fill="rgb(79,149,255)">
      <path d="M7 5.6c0-1.05 1.15-1.7 2.05-1.15l10.4 6.4c.85.53.85 1.77 0 2.3l-10.4 6.4C8.15 19.9 7 19.25 7 18.2z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" fill="rgb(79,149,255)">
      <path d="M7 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1zM14 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
    </svg>
  );
}

function SoundOnIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="white" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function SoundOffIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="white" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

const RING_BLUE = "#4A8DF8";
const RING_TRACK = "#F4F8FF";
const RING_STROKE = 4;
const RING_RADIUS = 200 - RING_STROKE / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function ProgressRing({ progress }) {
  const dashoffset = RING_CIRCUMFERENCE * (1 - progress);

  return (
    <svg
      viewBox="0 0 400 400"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
    >
      <circle cx="200" cy="200" r={RING_RADIUS} fill="none" stroke={RING_TRACK} strokeOpacity="1" strokeWidth={RING_STROKE * 3.5} />
      <circle
        cx="200"
        cy="200"
        r={RING_RADIUS}
        fill="none"
        stroke={RING_BLUE}
        strokeWidth={RING_STROKE}
        strokeLinecap="round"
        strokeDasharray={RING_CIRCUMFERENCE}
        strokeDashoffset={dashoffset}
      />
    </svg>
  );
}

const SWIPE_THRESHOLD_PX = 40;

export default function TestimonialCarousel() {
  const [centerIndex, setCenterIndex] = useState(HALF);
  const [playingId, setPlayingId] = useState(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const videoRefs = useRef({});
  const touchStartX = useRef(null);

  useEffect(() => {
    if (isHovering || playingId) return undefined;
    const timer = setInterval(() => {
      setCenterIndex((i) => (i + 1) % N);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [isHovering, playingId]);

  useEffect(() => {
    setVideoProgress(0);
    if (!playingId) return;
    const el = videoRefs.current[playingId];
    if (!el) return;
    el.currentTime = 0;
    const playResult = el.play();
    if (playResult && playResult.catch) playResult.catch(() => {});
  }, [playingId]);

  useEffect(() => {
    if (!playingId) return undefined;
    let rafId;
    const tick = () => {
      const el = videoRefs.current[playingId];
      if (el && el.duration) setVideoProgress(el.currentTime / el.duration);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [playingId]);

  const handleSelect = (index, id) => {
    if (playingId === id) {
      const el = videoRefs.current[id];
      if (el) {
        el.pause();
        el.currentTime = 0;
      }
      setPlayingId(null);
      return;
    }

    if (playingId) {
      const prevEl = videoRefs.current[playingId];
      if (prevEl) {
        prevEl.pause();
        prevEl.currentTime = 0;
      }
    }

    setCenterIndex(index);
    setPlayingId(id);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsHovering(true);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    setIsHovering(false);
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;
    setCenterIndex((i) => (deltaX < 0 ? (i + 1) % N : (i - 1 + N) % N));
  };

  return (
    <div
      className="testimonial-track relative h-[200px] w-full touch-pan-y overflow-hidden sm:h-[300px] lg:h-[400px]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setHoveredId(null);
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {virtualTestimonials.map((item, index) => {
        const offset = getOffset(index, centerIndex);
        const dist = Math.abs(offset);
        const isCenter = dist === 0;
        const isPlaying = playingId === item.id;
        const isHovered = hoveredId === item.id;

        return (
          <div
            key={item.id}
            className={`absolute left-1/2 top-1/2 ${isCenter ? CENTER_SIZE_CLASS : SIDE_SIZE_CLASS} ${dist >= 3 ? "hidden sm:block" : ""}`}
            style={{
              transform: `translate(-50%, -50%) translateX(${getTranslateX(offset)})`,
              zIndex: 10 - dist,
              transition: "transform 0.45s ease, width 0.45s ease, height 0.45s ease",
            }}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId((current) => (current === item.id ? null : current))}
          >
            <button
              type="button"
              aria-label={isPlaying ? `Pause testimonial from ${item.name}` : `Play testimonial from ${item.name}`}
              onClick={() => handleSelect(index, item.id)}
              className="relative block h-full w-full cursor-pointer overflow-hidden rounded-full bg-[#D9D9DC]"
            >
              <img
                src={item.avatar}
                alt={item.name}
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                style={{
                  filter: isCenter || isPlaying || isHovered ? "none" : "grayscale(1)",
                  transition: "filter 0.3s ease",
                }}
                draggable={false}
              />

              {isPlaying && (
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[item.id] = el;
                    else delete videoRefs.current[item.id];
                  }}
                  src={item.videoSrc}
                  poster={item.avatar}
                  playsInline
                  muted={isMuted}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  onEnded={() => {
                    const nextIndex = (index + 1) % N;
                    setCenterIndex(nextIndex);
                    setPlayingId(virtualTestimonials[nextIndex].id);
                  }}
                />
              )}

              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[rgb(29,36,46)]/20"
                style={{ opacity: isHovered ? 1 : 0, transition: "opacity 0.25s ease" }}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-[0_6px_18px_rgba(29,36,46,0.25)] sm:h-12 sm:w-12">
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </div>
              </div>
            </button>

            {isPlaying && <ProgressRing progress={videoProgress} />}

            {isPlaying && (
              <button
                type="button"
                aria-label={isMuted ? "Unmute testimonial video" : "Mute testimonial video"}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted((m) => !m);
                }}
                className={`absolute bottom-5 left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-black/10 backdrop-blur-xl ${isHovered ? "" : "pointer-events-none"}`}
                style={{ opacity: isHovered ? 1 : 0, transition: "opacity 0.25s ease" }}
              >
                {isMuted ? <SoundOffIcon /> : <SoundOnIcon />}
              </button>
            )}
          </div>
        );
      })}

      <div
        className="pointer-events-none absolute left-0 top-0 z-20 h-full w-[100px] sm:w-[150px] lg:w-[200px]"
        style={{ background: "linear-gradient(to right, white 0%, transparent 100%)" }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 z-20 h-full w-[100px] sm:w-[150px] lg:w-[200px]"
        style={{ background: "linear-gradient(to left, white 0%, transparent 100%)" }}
      />
    </div>
  );
}
