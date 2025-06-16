import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CommentsSection from '../components/CommentsSection';
import SuggestedVideos from '../components/SuggestedVideos';
import VideoInfoSection from '../components/VideoInfoSection';
import Spinner from '../components/Spinner';
export default function VideoPlayerPage() {
  const { id } = useParams();
  console.log("id",id)
  const [video, setVideo] = useState(null);
const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const videoRes = await axios.get(`http://localhost:5000/videos/${id}`);
      setVideo(videoRes.data);

      // const commentsRes = await axios.get(`http://localhost:5000/comments/video/${id}`);
      // setComments(commentsRes.data);

      const allVideos = await axios.get(`http://localhost:5000/videos`);
      console.log("allVideos",allVideos)
      const suggets=allVideos.data.filter(v => v._id !== id)
      console.log("suggest",suggets)

      setSuggested(allVideos.data.filter(v => v._id !== id));
    };
    fetchData();
  }, [id]);

  if (!video) return <Spinner/>;

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4">
      {/* Left section */}
      <div className="flex-1">
        {/* Video Player + Info */}
        <div className="aspect-video mb-4 rounded-lg overflow-hidden">
          <video controls className="w-full h-full object-cover" poster={video.thumbnailUrl}>
            <source src={video.videoUrl} type="video/mp4" />
          </video>
        </div>
        <VideoInfoSection video={video} />
        {/* Comments */}
        <CommentsSection videoId={id}  />
      </div>

      {/* Right section */}
      <div className="w-full lg:w-1/3">

        <SuggestedVideos videos={suggested} />

      </div>
    </div>
  );
}
