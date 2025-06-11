import { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "./VideoCard";

const VideoGrid = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/videos");
        setVideos(res.data);
      } catch (err) {
        setError("Failed to load videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
  <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">

      {videos.map((video) => (
        <VideoCard key={video.id} {...video} />
      ))}
    </div>
  );
};

export default VideoGrid;
