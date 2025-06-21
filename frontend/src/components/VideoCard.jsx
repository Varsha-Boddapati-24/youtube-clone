
import { useRef, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getTimeAgo, formatDuration } from '../utils/dateUtils';
export default function VideoCard({ _id, thumbnailUrl, title, videoUrl, channelId, views, createdAt, }) {

    const videoRef = useRef(null);// Reference to the <video> element

    const [duration, setDuration] = useState(null); // To store video duration
    const [progress, setProgress] = useState(0); // Track playback progress while hovering
    const [isHovering, setIsHovering] = useState(false); // Track hover state to toggle thumbnail/video
    // Memoize the "time ago" string to avoid recalculating unless createdAt changes
    const timeAgo = useMemo(() => getTimeAgo(createdAt), [createdAt]);
    // Fetch duration of video when metadata is loaded
    useEffect(() => {
        const video = videoRef.current;

        const handleLoadedMetadata = () => {
            const seconds = video?.duration || 0;
            setDuration(seconds);
        };

        video?.addEventListener("loadedmetadata", handleLoadedMetadata);
        return () => video?.removeEventListener("loadedmetadata", handleLoadedMetadata);
    }, []);
    // While hovering, calculate playback progress percentage in a loop using requestAnimationFrame
    useEffect(() => {
        let frameId;

        const updateProgress = () => {
            if (videoRef.current && duration && isHovering) {
                const current = videoRef.current.currentTime;
                setProgress((current / duration) * 100);
            }
            frameId = requestAnimationFrame(updateProgress);
        };

        if (isHovering) {
            frameId = requestAnimationFrame(updateProgress);
        }

        return () => cancelAnimationFrame(frameId);
    }, [isHovering, duration]);

    return (
        <Link to={`/video/${_id}`} className="block">
            <div className="w-full bg-white hover:bg-gray-50 rounded-lg overflow-hidden group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {/* --- Thumbnail/Video Preview Section --- */}
                <div className="relative w-full aspect-video">
                    {/* Static thumbnail */}
                    <img
                        src={thumbnailUrl}
                        alt={title}
                        className="w-full h-full object-cover  group-hover:hidden"
                    />
                    {/* Autoplay preview on hover */}
                    <video
                        ref={videoRef}
                        src={videoUrl}
                        muted
                        autoPlay
                        loop
                        className="w-full  h-full object-cover absolute top-0 left-0 hidden group-hover:block"
                    />
                    {/* Show formatted duration in bottom-right corner */}
                    {duration && (
                        <span className="absolute bottom-1 right-1 bg-black bg-opacity-150 text-white text-xs px-1.5 py-0.5 rounded">
                            {formatDuration(duration)}
                        </span>
                    )}
                    {/* Red progress bar at bottom while preview is playing */}
                    <div
                        className="absolute bottom-0 left-0 h-1 bg-red-500 transition-all"
                        style={{ width: `${progress}%` }}></div>


                </div>
                {/* --- Video Meta Info Section --- */}
                <div className="flex gap-3 p-3">
                    {/* Placeholder for future channel avatar */}
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0">
                        <img
                            src={channelId?.channelAvatar
                                ? channelId.channelAvatar
                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(channelId.channelName)}&background=random`}
                            alt={channelId.channelName}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    </div>
                    {/* Video title, channel, and meta info */}
                    <div className="flex flex-col">
                        <h3 className="text-sm font-semibold line-clamp-2 mb-1">{title}</h3>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                            {channelId.channelName}
                            <i className="fa-solid fa-circle-check  text-[0.75rem] leading-none relative top-[1px]"></i>
                        </p>


                        <p className="text-xs text-gray-500">{views.toLocaleString()} views • {timeAgo}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
