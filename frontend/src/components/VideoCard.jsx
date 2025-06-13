
import { useRef, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getTimeAgo, formatDuration } from '../utils/dateUtils';
export default function VideoCard({ _id,thumbnailUrl, title, videoUrl, channelId, views, createdAt ,}) {

    const videoRef = useRef(null);
    const [duration, setDuration] = useState(null);
    const [progress, setProgress] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

  const timeAgo = useMemo(() => getTimeAgo(createdAt), [createdAt]);


    useEffect(() => {
        const video = videoRef.current;

        const handleLoadedMetadata = () => {
            const seconds = video?.duration || 0;
            setDuration(seconds);
        };

        video?.addEventListener("loadedmetadata", handleLoadedMetadata);
        return () => video?.removeEventListener("loadedmetadata", handleLoadedMetadata);
    }, []);
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
            {/* Thumbnail */}
            <div className="relative w-full aspect-video">
                <img
                    src={thumbnailUrl}
                    alt={title}
                    className="w-full h-full object-cover  group-hover:hidden"
                />
                <video
                    ref={videoRef}
                    src={videoUrl}
                    muted
                    autoPlay
                    loop
                    className="w-full  h-full object-cover absolute top-0 left-0 hidden group-hover:block"
                />
                {duration && (
                    <span className="absolute bottom-1 right-1 bg-black bg-opacity-150 text-white text-xs px-1.5 py-0.5 rounded">
                        {formatDuration(duration)}
                    </span>
                )}
                <div 
             className="absolute bottom-0 left-0 h-1 bg-red-500 transition-all"
                 style={{ width: `${progress}%` }}></div>


            </div>

            {/* Video info */}
            <div className="flex gap-3 p-3">
                {/* Placeholder for future channel avatar */}
                <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>

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
