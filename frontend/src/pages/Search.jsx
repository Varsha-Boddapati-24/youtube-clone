import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import VideoCard from "../components/VideoCard";

export default function Search() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const res = await axios.get(`http://localhost:5000/videos/search?query=${query}`);
      setVideos(res.data);
    };
    fetchResults();
  }, [query]);

  return (
    <div className="p-4 grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
      {videos.map(video => (
        <VideoCard key={video._id} {...video} />
      ))}
    </div>
  );
}
