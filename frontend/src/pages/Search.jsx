import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { getTimeAgo } from "../utils/dateUtils";
import SearchCard from "../components/SearchCard";
import FilterBar from "../components/FilterBar";

export default function Search() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const [videos, setVideos] = useState([]);
   const [activeFilter, setActiveFilter] = useState("All");
  
    const handleFilterChange = (filter) => {
      setActiveFilter(filter);
    };
  
    const filteredVideos = activeFilter === "All"
      ? videos
      : videos.filter((video) => video.category === activeFilter);

  useEffect(() => {
    const fetchResults = async () => {
      const res = await axios.get(`http://localhost:5000/videos/search?query=${query}`);
      setVideos(res.data);
    };
    fetchResults();
  }, [query]);

  return (
    <>
  
      <FilterBar onFilterChange={handleFilterChange} />
    <div className="p-4 ">
      {filteredVideos.map((video) => (
     <SearchCard key={video._id} video={video} />
      ))}
    </div>
      </>
  );
}
