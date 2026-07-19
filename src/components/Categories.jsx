import { useState } from "react";
import VideoCoverflow from "./VideoCoverflow";
import VideoModal from "./VideoModal";

// Free stock clips (Mixkit license, no attribution required), each picked to match its title.
const videos = [
  {
    id: "vid-1",
    title: "ASMR",
    thumbnail: "https://assets.mixkit.co/videos/3461/3461-thumb-720-0.jpg",
    videoSrc: "https://assets.mixkit.co/videos/3461/3461-720.mp4",
  },
  {
    id: "vid-2",
    title: "Fantasy Realm",
    thumbnail: "https://assets.mixkit.co/videos/34841/34841-thumb-720-0.jpg",
    videoSrc: "https://assets.mixkit.co/videos/34841/34841-720.mp4",
  },
  {
    id: "vid-3",
    title: "Concert Stage",
    thumbnail: "https://assets.mixkit.co/videos/17631/17631-thumb-720-0.jpg",
    videoSrc: "https://assets.mixkit.co/videos/17631/17631-720.mp4",
  },
  {
    id: "vid-4",
    title: "Ocean Escape",
    thumbnail: "https://assets.mixkit.co/videos/4078/4078-thumb-720-0.jpg",
    videoSrc: "https://assets.mixkit.co/videos/4078/4078-720.mp4",
  },
  {
    id: "vid-5",
    title: "City Nights",
    thumbnail: "https://assets.mixkit.co/videos/50989/50989-thumb-720-0.jpg",
    videoSrc: "https://assets.mixkit.co/videos/50989/50989-720.mp4",
  },
  {
    id: "vid-6",
    title: "Wild Nature",
    thumbnail: "https://assets.mixkit.co/videos/529/529-thumb-720-0.jpg",
    videoSrc: "https://assets.mixkit.co/videos/529/529-720.mp4",
  },
  {
    id: "vid-7",
    title: "Cinema Hall",
    thumbnail: "https://assets.mixkit.co/active_storage/video_items/100299/1722634115/100299-video-thumb-720-0.jpg",
    videoSrc: "https://assets.mixkit.co/active_storage/video_items/100299/1722634115/100299-video-720.mp4",
  },
  {
    id: "vid-8",
    title: "Adventure Peak",
    thumbnail: "https://assets.mixkit.co/videos/12970/12970-thumb-720-0.jpg",
    videoSrc: "https://assets.mixkit.co/videos/12970/12970-720.mp4",
  },
];

export default function Categories() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div className="mt-16 w-full bg-white sm:mt-[100px] md:mt-[100px]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center px-4 sm:px-6 md:px-8">
        <div className="flex w-full max-w-[1100px] flex-col items-center gap-5 text-center sm:gap-8">
          <span className="text-[24px] leading-none font-semibold tracking-[-0.04em] sm:text-[36px] lg:text-[48px]">Thousands of worlds. One player</span>
          <span className="text-sm font-normal text-[rgb(63,78,100)] md:text-base">Every genre, every platform, one place to watch it all</span>
        </div>

        <div className="mt-8 flex w-full flex-col items-center gap-12 sm:mt-12">
          <VideoCoverflow videos={videos} onPlay={setActiveVideo} />

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              className="flex h-11 items-center gap-1 px-3 font-sans text-[15px] font-semibold text-[rgb(86,107,138)] transition-colors hover:text-[rgb(29,36,46)]"
            >
              View all categories
              <img src="/uploads/Icon-arrow-right-91a85975.svg" alt="" className="h-5 w-5" />
            </button>
            <a
              href="#dont-think-twice"
              className="flex h-11 items-center rounded-[100px] bg-[rgb(255,94,153)] px-8 py-1 font-sans text-[15px] font-semibold text-white transition-colors hover:bg-[rgb(253,33,113)]"
            >
              Free Download
            </a>
          </div>
        </div>

        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      </div>
    </div>
  );
}
