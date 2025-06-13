import FilterBar from "../components/FilterBar";
import VideoGrid from "../components/VideoGrid";
import { useState,useEffect } from "react";
import axios from "axios";

function Home() {
  const [filter, setFilter] = useState("All");
   const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
    useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          filter === "All"
            ? "http://localhost:5000/videos"
            : `http://localhost:5000/videos?category=${filter}`
        );
        setVideos(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [filter]);
  return (
    <>
         <FilterBar onFilterChange={setFilter} activeFilter={filter} />
      <div className="p-4">
         {loading ? <p>Loading...</p> : <VideoGrid videos={videos} />}
      </div>
    </>

  );
}

export default Home;
