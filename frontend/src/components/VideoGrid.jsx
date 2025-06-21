
import VideoCard from "./VideoCard";

const VideoGrid = ({ videos }) => {


  return (
  <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">

      {videos.map((video) => (
        <VideoCard key={video._id} {...video} />
      ))}
    </div>
  );
};

export default VideoGrid;
