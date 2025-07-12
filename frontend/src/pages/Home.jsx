import FilterBar from "../components/FilterBar";
import VideoGrid from "../components/VideoGrid";
import { useState,useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

function Home() {
  // Stores selected filter value (e.g., "All", "Sports", etc.)
  const [filter, setFilter] = useState("All");
  // Stores the list of videos currently loaded
   const [videos, setVideos] = useState([]);
     // Keeps track of the current page number for pagination
     const [page, setPage] = useState(1);
     // Determines if more videos are available to fetch
  const [hasMore, setHasMore] = useState(true);
  // Indicates if the videos are still being initially loaded
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   // When the filter changes:
    // - clear current videos
    // - reset page to 1
    // - reset loading and hasMore
    setVideos([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
  }, [filter]);
 useEffect(() => {
    const fetchVideos = async () => {
      try {
           // If filter is "All", don't include category param
        const res = await axios.get(
          filter === "All"
            ? `https://youtube-clone-vkhx.onrender.com/videos?page=${page}&limit=10`
            : `https://youtube-clone-vkhx.onrender.com/videos?category=${filter}&page=${page}&limit=10`
        );
        // Append new videos to the existing list
        setVideos(prev => [...prev, ...res.data.videos]);
        
        // Set hasMore to false when no more videos are available
        setHasMore(res.data.hasMore);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [filter, page]);// Re-run when filter or page changes
  return (
    <>
       {/* Filter bar for selecting video category */}
         <FilterBar onFilterChange={setFilter} activeFilter={filter} />
      <div className="p-4">
          {/* Show loading spinner initially */}
         {loading ? <Spinner/> :(
          <InfiniteScroll
            dataLength={videos.length} // Number of loaded items
            next={() => setPage(prev => prev + 1)}// call to load next page
            hasMore={hasMore}// Whether more data is available
            loader={<h4 className="text-center">Loading more videos...</h4>}// Show while loading next batch
            endMessage={
              <p className="text-center text-gray-500 mt-4">
                 You've reached the end of the list.
              </p>
            }
          >
               {/* Grid of video cards */}
            <VideoGrid videos={videos} />
          </InfiniteScroll>
        )}
      </div>
    </>

  );
}

export default Home;
