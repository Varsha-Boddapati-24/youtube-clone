import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDuration, getTimeAgo } from "../utils/dateUtils";

export default function SearchCard({ video }) {
    const videoRef = useRef(null);
    const [duration, setDuration] = useState(null);
    const [isHovering, setIsHovering] = useState(false);
    
    const [showVideo, setShowVideo] = useState(false);
    useEffect(() => {
              console.log("inside useeffect")
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
            className="flex flex-col sm:flex-row gap-4 mb-6 pb-4  group"
            onMouseEnter={() => { 
                setIsHovering(true); 
                setShowVideo(false); 
            }}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="w-full sm:w-1/2 relative rounded-xl overflow-hidden">
                <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className={`w-full h-40 lg:h-70 object-cover ${isHovering && showVideo ? "hidden" : "block"}`}
                />
             
                    <video
                        ref={videoRef}
                        src={video.videoUrl}
                        muted
                        autoPlay
                        loop
                        poster={video.thumbnailUrl}
                        // onLoadedData={handleLoadedData}
                          className={`w-full h-40 lg:h-70 object-cover absolute top-0 left-0 
              ${isHovering  ? 'block' : 'hidden'}`}
                    />
                
            {duration && (
                    <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
                         {formatDuration(duration)}
                    </span>
                )}

             
            </div>

            <div className="w-full sm:w-1/2 flex flex-col mt-2 gap-2">
                <h2 className="text-lg font-semibold line-clamp-2">{video.title}</h2>
                <p className="text-sm text-gray-500">{video.views.toLocaleString()} views • {getTimeAgo(video.createdAt)}</p>
                <p className="text-sm text-gray-700">{video.description}</p>
            </div>
        </Link>
    );
}
