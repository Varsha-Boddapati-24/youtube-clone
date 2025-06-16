import { getTimeAgo } from "../utils/dateUtils";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
export default function VideoInfoSection({ video }) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [likes, setLikes] = useState(video.likes?.length);
    const [dislikes, setDislikes] = useState(video.dislikes?.length);
    const [hasLiked, setHasLiked] = useState(video.likes?.includes(user?._id));
    const [hasDisliked, setHasDisliked] = useState(video.dislikes?.includes(user?._id));
    const [showLikeSignInModal, setShowLikeSignInModal] = useState(false);
    const requireLogin = () => {
        if (!user) {
            setShowLikeSignInModal(true);
        }
        return false;
    };
    const handleLike = async () => {
        if (requireLogin()) return;

        try {
            const res = await axios.post(`http://localhost:5000/videos/${video._id}/like`, {}, { withCredentials: true });
            //   const result=await axios.post(`http://localhost:5000/videos/${video._id}`);
            setLikes(res.data.likes?.length);
            setDislikes(res.data.dislikes?.length);
            setHasLiked(res.data.likes?.includes(user._id));
            setHasDisliked(res.data.dislikes?.includes(user._id));

        } catch (err) {
            console.error("Error liking video", err);
        }
    };

    const handleDislike = async () => {
        if (requireLogin()) return;

        try {
            const res = await axios.post(`http://localhost:5000/videos/${video._id}/dislike`, {}, { withCredentials: true });

            setLikes(res.data.likes?.length);
            setDislikes(res.data.dislikes?.length);
            setHasLiked(res.data?.likes?.includes(user._id));
            setHasDisliked(res.data?.dislikes?.includes(user._id));

        } catch (err) {
            console.error("Error disliking video", err);
        }
    };
    return (
        <div className="mt-4">
            {/* Title */}
            <h1 className="text-xl font-bold mb-2">{video.title}</h1>

            {/* Channel Info + Subscribe */}
            <div className="flex gap-5 items-center mb-4">
                <div className="flex items-center gap-3">
                    {/* Channel Avatar (static placeholder for now) */}
                    <div className="w-10 h-10 bg-gray-300 rounded-full">
                      {console.log("video.channelId.channelAvatar",video.channelId)}
                         <img
                            src={video.channelId?.channelAvatar
                                ? video.channelId.channelAvatar
                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(video.channelId.channelName)}&background=random`}
                            alt={video.channelId.channelName}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    </div>

                    <div >
                        <p className="font-semibold">{video.channelId?.channelName}</p>
                        <p className="text-xs text-gray-500">22.5M subscribers</p>
                    </div>
                </div>

                <button className="bg-black text-white px-4 py-1.5 rounded-full font-semibold">
                    Subscribe
                </button>
            </div >
            <div className="flex  overflow-x-auto  gap-4 mb-4 text-sm " style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none"
            }}>
                <div className="flex bg-gray-200 rounded-full overflow-hidden text-sm flex-shrink-0">
                    <button className={`px-3 py-1 border-r-1 cursor-pointer border-gray-500 ${hasLiked ? "text-blue-600" : ""}`} onClick={handleLike}><i className="fa-regular fa-thumbs-up  text-base mr-1.5"></i>{likes}</button>
                    <button className={`px-3 py-1 cursor-pointer bg-gray-200 ${hasDisliked ? "text-blue-600" : ""}`} onClick={handleDislike}><i className="fa-regular fa-thumbs-down  text-base mr-1.5"></i> {dislikes}</button>

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

            {showLikeSignInModal && (
                <div className="relative">
                    <div className="absolute top-0 left-0 bg-white shadow-lg p-6 rounded-lg w-80 z-50 border">
                        <h2 className="text-lg font-semibold mb-2">Want to like this video?</h2>
                        <p className="text-sm text-gray-600 mb-4">Sign in to continue</p>
                        <button
                            className="w-full bg-black text-white py-2 rounded text-md font-semibold"
                            onClick={() => {
                                setShowLikeSignInModal(false);
                                const currentPath = location.pathname;
                                navigate(`/signin?redirect=${encodeURIComponent(currentPath)}`);
                            }}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setShowLikeSignInModal(false)}
                            className="mt-3 text-sm text-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}



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
