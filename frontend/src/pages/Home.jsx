import FilterBar from "../components/FilterBar";
import VideoGrid from "../components/VideoGrid";
import { useState } from "react";

function Home() {
  const [filter, setFilter] = useState("All");
  return (
    <>
      <FilterBar onFilterChange={setFilter} />
      <div className="p-4">
        <VideoGrid />
      </div>
    </>

  );
}

export default Home;
