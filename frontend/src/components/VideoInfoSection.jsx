import { getTimeAgo } from "../utils/dateUtils";

export default function VideoInfoSection({ video }) {
    return (
        <div className="mt-4">
            {/* Title */}
            <h1 className="text-xl font-bold mb-2">{video.title}</h1>

            {/* Channel Info + Subscribe */}
            <div className="flex gap-5 items-center mb-4">
                <div className="flex items-center gap-3">
                    {/* Channel Avatar (static placeholder for now) */}
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>

                    <div >
                        <p className="font-semibold">{video.channelId?.channelName}</p>
                        <p className="text-xs text-gray-500">22.5M subscribers</p>
                    </div>
                </div>

                <button className="bg-black text-white px-4 py-1.5 rounded-full font-semibold">
                    Subscribe
                </button>
            </div >
            <div className="flex  overflow-x-auto  gap-4 mb-4 text-sm "  style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none"
            }}>
                <div className="flex bg-gray-200 rounded-full overflow-hidden text-sm flex-shrink-0">
                    <button className="px-3 py-1    border-r-1 border-gray-500"><i className="fa-regular fa-thumbs-up  text-base mr-1.5"></i>{video.likes}</button>
                    <button className="px-3 py-1 bg-gray-200 "><i className="fa-regular fa-thumbs-down  text-base mr-1.5"></i> {video.dislikes}</button>

                </div>
                {/* Share */}
                <button className="px-3 py-1 bg-gray-200 rounded-full flex items-center gap-2 flex-shrink-0">
                    <i className="fa-solid fa-share text-base"></i> Share
                </button>

                {/* Download */}
                <button className="px-3 py-1 bg-gray-200 rounded-full flex items-center gap-2 flex-shrink-0">
                    <i className="fa-solid fa-download text-base"></i> Download
                </button>

                {/* Clip */}
                <button className="px-3 py-1 bg-gray-200 rounded-full flex items-center gap-2 flex-shrink-0">
                    <i className="fa-solid fa-scissors text-base"></i> Clip
                </button>

                {/* Save */}
                <button className="px-3 py-1 bg-gray-200 rounded-full flex items-center gap-2 flex-shrink-0">
                    <i className="fa-regular fa-bookmark text-base"></i> Save
                </button>
            </div>

            {/* Views & Upload Date */}


            {/* Description */}
            <div className="bg-gray-100 p-3 rounded-lg text-sm leading-relaxed">
                <p className="text-sm text-gray-600 mb-4">
                    {video.views.toLocaleString()} views • {getTimeAgo(video.createdAt)}
                </p>

                <p className="mt-2">{video.description}</p>
            </div>
        </div>
    );
}
