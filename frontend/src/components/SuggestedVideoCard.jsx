import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDuration, getTimeAgo } from "../utils/dateUtils";  // ✅ (your already created helper functions)

export default function SuggestedVideoCard({ video }) {
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleLoadedMetadata = () => {
      const seconds = videoRef.current?.duration || 0;
      setDuration(seconds);
    };

    videoRef.current?.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => videoRef.current?.removeEventListener("loadedmetadata", handleLoadedMetadata);
  }, []);

  return (
    <Link
      to={`/video/${video._id}`}
      className="flex gap-3 group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Thumbnail with hover autoplay */}
      <div className="w-40 h-24 flex-shrink-0 rounded overflow-hidden relative">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className={`w-full h-full object-cover ${isHovering ? "hidden" : "block"}`}
        />
        <video
          ref={videoRef}
          src={video.videoUrl}
          muted
          autoPlay
          loop
          className={`w-full h-full object-cover absolute top-0 left-0 ${isHovering ? "block" : "hidden"}`}
        />
        {duration && (
          <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
            {formatDuration(duration)}
          </span>
        )}
      </div>

      {/* Right side info */}
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-sm line-clamp-2">{video.title}</p>
        <p className="text-xs text-gray-600 flex items-center gap-1">
          {video.channelId?.channelName}
          <i className="fa-solid fa-circle-check text-[0.75rem] leading-none relative top-[1px]"></i>
        </p>
        <p className="text-xs text-gray-500">
          {video.views.toLocaleString()} views • {getTimeAgo(video.createdAt)}
        </p>
      </div>
    </Link>
  );
}
