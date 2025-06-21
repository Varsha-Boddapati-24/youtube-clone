import { useState } from "react";
import FilterBar from "./FilterBar";
import SuggestedVideoCard from "./SuggestedVideoCard";

export default function SuggestedVideos({ videos }) {
  // State to track the currently selected category filter
  const [activeFilter, setActiveFilter] = useState("All");

  // Handle filter change from FilterBar
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };
 // Filter the videos based on selected category
  const filteredVideos = activeFilter === "All"
    ? videos // Show all if "All" is selected
    : videos.filter((video) => video.category === activeFilter);// Otherwise filter by category

  return (
    <div>
       {/* Section Heading */}
      <h2 className="font-semibold text-lg mb-4">Suggested Videos</h2>
        {/* Filter buttons */}
      <FilterBar onFilterChange={handleFilterChange} />
       {/* List of filtered video cards */}
      <div className="flex flex-col gap-4 mt-4">
        {filteredVideos.map((video) => (
          <SuggestedVideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}
