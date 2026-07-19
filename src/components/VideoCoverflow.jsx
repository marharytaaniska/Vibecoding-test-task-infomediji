import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" fill="rgb(79,149,255)">
      <path d="M7 5.6c0-1.05 1.15-1.7 2.05-1.15l10.4 6.4c.85.53.85 1.77 0 2.3l-10.4 6.4C8.15 19.9 7 19.25 7 18.2z" />
    </svg>
  );
}

// Swiper's auto loop-buffer sizing can't keep up with this many overlapping
// coverflow slides on wide screens when there are only a handful of real
// videos, so the carousel dead-ends instead of wrapping. Duplicating the
// list into several copies (same trick as TestimonialCarousel) gives loop
// mode enough real slides to wrap seamlessly in either direction.
const COPIES = 4;

function buildVirtualVideos(videos) {
  return Array.from({ length: COPIES }, (_, copy) =>
    videos.map((video) => ({ ...video, id: `${video.id}-c${copy}` }))
  ).flat();
}

export default function VideoCoverflow({ videos, onPlay }) {
  const virtualVideos = buildVirtualVideos(videos);

  return (
    <div className="relative w-full max-w-[4170px]">
      <Swiper
        modules={[EffectCoverflow]}
        effect="coverflow"
        grabCursor
        centeredSlides
        loop
        slidesPerView="auto"
        slideToClickedSlide
        coverflowEffect={{
          rotate: 14,
          stretch: -23,
          depth: 75,
          modifier: 1,
          slideShadows: false,
        }}
        breakpoints={{
          0: { spaceBetween: -83, coverflowEffect: { rotate: 14, stretch: -23, depth: 75, modifier: 1, slideShadows: false } },
          640: { spaceBetween: -130, coverflowEffect: { rotate: 14, stretch: -40, depth: 125, modifier: 1, slideShadows: false } },
          768: { spaceBetween: -160, coverflowEffect: { rotate: 14, stretch: -50, depth: 150, modifier: 1, slideShadows: false } },
          1024: { spaceBetween: -200, coverflowEffect: { rotate: 14, stretch: -60, depth: 190, modifier: 1, slideShadows: false } },
          1280: { spaceBetween: -240, coverflowEffect: { rotate: 14, stretch: -70, depth: 225, modifier: 1, slideShadows: false } },
        }}
        className="video-coverflow"
      >
        {virtualVideos.map((video) => (
          <SwiperSlide
            key={video.id}
            className="!w-[293px] sm:!w-[480px] md:!w-[570px] lg:!w-[720px] xl:!w-[855px]"
          >
            {({ isActive }) => (
              <button
                type="button"
                onClick={() => isActive && onPlay(video)}
                className="group block w-full cursor-pointer text-left"
                aria-label={`Play ${video.title}`}
              >
                <div className="relative aspect-video overflow-hidden rounded-[24px] bg-[rgb(219,221,225)] sm:rounded-[30px]">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{ background: "linear-gradient(180deg, rgba(29,36,46,0) 55%, rgba(29,36,46,0.55) 100%)" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-[0_6px_18px_rgba(29,36,46,0.25)] transition-opacity duration-200 group-hover:opacity-100">
                      <PlayIcon />
                    </div>
                  </div>
                  <h4 className="pointer-events-none absolute bottom-6 left-[30px] right-[30px] truncate text-[18px] font-semibold tracking-[-0.02em] text-white sm:text-[20px]">
                    {video.title}
                  </h4>
                </div>
              </button>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
