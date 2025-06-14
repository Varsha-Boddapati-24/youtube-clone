import { useState } from "react";
import FilterBar from "./FilterBar";
import SuggestedVideoCard from "./SuggestedVideoCard";

export default function SuggestedVideos({ videos }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const filteredVideos = activeFilter === "All"
    ? videos
    : videos.filter((video) => video.category === activeFilter);

  return (
    <div>
      <h2 className="font-semibold text-lg mb-4">Suggested Videos</h2>
      <FilterBar onFilterChange={handleFilterChange} />
      <div className="flex flex-col gap-4 mt-4">
        {filteredVideos.map((video) => (
          <SuggestedVideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}
