import { useEffect } from "react";

export default function VideoModal({ video, onClose }) {
  useEffect(() => {
    if (!video) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-[rgb(29,36,46)]/80 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[960px] overflow-hidden rounded-[20px] bg-black shadow-[0_24px_64px_rgba(0,0,0,0.4)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close video"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/10 backdrop-blur-[20px]"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <video
          key={video.id}
          src={video.videoSrc}
          poster={video.thumbnail}
          controls
          autoPlay
          className="aspect-video w-full bg-black"
        />

        <div className="px-6 py-4">
          <span className="text-lg font-semibold tracking-[-0.02em] text-white">{video.title}</span>
        </div>
      </div>
    </div>
  );
}
