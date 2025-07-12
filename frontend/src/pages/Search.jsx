import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SearchCard from "../components/SearchCard";
import FilterBar from "../components/FilterBar";

export default function Search() {
   // React Router hook to get current URL and query params
  const location = useLocation();
  // Extract the search query parameter 
  const query = new URLSearchParams(location.search).get("q");
   // State to store videos fetched from backend
  const [videos, setVideos] = useState([]);
  // State to manage selected filter in UI 
   const [activeFilter, setActiveFilter] = useState("All");
  // Function to update selected filter
    const handleFilterChange = (filter) => {
      setActiveFilter(filter);
    };
    // Filter videos by selected category, or show all if filter is "All"
    const filteredVideos = activeFilter === "All"
      ? videos
      : videos.filter((video) => video.category === activeFilter);
// Fetch search results when query changes
  useEffect(() => {
    const fetchResults = async () => {
      const res = await axios.get(`https://youtube-clone-vkhx.onrender.com/videos/search?query=${query}`);
      setVideos(res.data);// update video list with response
    };
    fetchResults();
  }, [query]);

  return (
    <>
    {/* Filter bar to select category */}
      <FilterBar onFilterChange={handleFilterChange} />
       {/* Search results list */}
    <div className="p-4 ">
      {filteredVideos.map((video) => (
           // Render each video using SearchCard component
     <SearchCard key={video._id} video={video} />
      ))}
    </div>
      </>
  );
}
