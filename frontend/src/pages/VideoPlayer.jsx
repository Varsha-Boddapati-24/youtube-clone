import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CommentsSection from '../components/CommentsSection';
import SuggestedVideoCard from '../components/SuggestedVideoCard';
import VideoInfoSection from '../components/VideoInfoSection';

export default function VideoPlayerPage() {
  const { id } = useParams();
  console.log("id",id)
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const videoRes = await axios.get(`http://localhost:5000/videos/${id}`);
      setVideo(videoRes.data);

      const commentsRes = await axios.get(`http://localhost:5000/comments/video/${id}`);
      setComments(commentsRes.data);

      const allVideos = await axios.get(`http://localhost:5000/videos`);
      console.log("allVideos",allVideos)
      const suggets=allVideos.data.filter(v => v._id !== id)
      console.log("suggest",suggets)

      setSuggested(allVideos.data.filter(v => v._id !== id));
    };
    fetchData();
  }, [id]);

  if (!video) return <p>Loading...</p>;

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

        {/* <h1 className="text-xl font-semibold mb-1">{video.title}</h1>
        <p className="text-sm text-gray-600 mb-2">
          {video.views.toLocaleString()} views • {new Date(video.createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm mb-4">{video.description}</p> */}
        <VideoInfoSection video={video} />
  
     

        {/* Comments */}
        <CommentsSection videoId={id} comments={comments} setComments={setComments} />
      </div>

      {/* Right section */}
      <div className="w-full lg:w-1/3">
         <h2 className="font-semibold text-lg mb-4">Suggested Videos</h2>
        <div className="flex flex-col gap-4">
          {suggested.map(video => (
            <SuggestedVideoCard key={video._id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}
