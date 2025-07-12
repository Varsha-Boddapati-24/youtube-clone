import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CommentsSection from '../components/CommentsSection';
import SuggestedVideos from '../components/SuggestedVideos';
import VideoInfoSection from '../components/VideoInfoSection';
import Spinner from '../components/Spinner';
export default function VideoPlayerPage() {
  // Extract the `id` from the route parameter 
  const { id } = useParams();
  // State to store the currently selected video
  const [video, setVideo] = useState(null);
  // State to store suggested videos excluding the current one
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    // Fetch video details and suggested videos whenever the ID changes
    const fetchData = async () => {
      // Fetch the current video by ID
      const videoRes = await axios.get(`https://youtube-clone-vkhx.onrender.com/videos/${id}`);
      setVideo(videoRes.data);
      // Fetch all videos for suggestions
      const allVideos = await axios.get(`https://youtube-clone-vkhx.onrender.com/videos`);
      // Filter out the current video from the suggestions
      const suggets = allVideos.data.videos.filter(v => v._id !== id)

      setSuggested(allVideos.data.videos.filter(v => v._id !== id));
    };
    fetchData();
  }, [id]);// re-run when video ID changes
  // Show loading spinner while video data is being fetched
  if (!video) return <Spinner />;

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4">
      {/* Left section: main video, info, and comments */}
      <div className="flex-1">
        {/* Video Player + Info */}
        <div className="aspect-video mb-4 rounded-lg overflow-hidden">
          <video key={video._id} controls preload="metadata" className="w-full h-full object-cover" poster={video.thumbnailUrl}>
            <source src={video.videoUrl} type="video/mp4" />
          </video>
        </div>
        {/* Video info (title, channel, views, likes, etc.) */}
        <VideoInfoSection video={video} />
        {/* Comments for the video */}
        <CommentsSection videoId={id} />
      </div>

      {/* Right section: suggested videos */}
      <div className="w-full lg:w-1/3">

        <SuggestedVideos videos={suggested} />

      </div>
    </div>
  );
}
