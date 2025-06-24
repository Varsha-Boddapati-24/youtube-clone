import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDuration, getTimeAgo } from '../utils/dateUtils';

export default function PublishedVideoCard({
  video,
  channelName,
  editingVideoId,
  editingTitle,
  editingDescription,
  setEditingVideoId,
  setEditingTitle,
  setEditingDescription,
  handleEditSubmit,
}) {
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    const handleMetadata = () => {
      setDuration(videoRef.current?.duration || 0);
    };
    const vid = videoRef.current;
    if (vid) {
      vid.addEventListener('loadedmetadata', handleMetadata);
      return () => vid.removeEventListener('loadedmetadata', handleMetadata);
    }
  }, []);

  return (
    <div className="flex w-full">
      <Link to={`/video/${video._id}`} className="relative w-48 h-28 flex-shrink-0">
        <img src={video.thumbnailUrl} className="w-full h-full object-cover rounded" />
        <video ref={videoRef} src={video.videoUrl} className="hidden" />
        {duration && (
          <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
            {formatDuration(duration)}
          </span>
        )}
      </Link>

      <div className="flex-1 px-4">
        {editingVideoId === video._id ? (
          <>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                className="border w-full py-2 px-2 rounded"
                type="text"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                className="border w-full py-2 px-2 rounded"
                value={editingDescription}
                onChange={(e) => setEditingDescription(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 mt-2">
              <button onClick={() => setEditingVideoId(null)} className="text-gray-500 cursor-pointer">Cancel</button>
              <button
                onClick={() => handleEditSubmit(video._id)}
                className="bg-blue-600 text-white px-4 py-1 rounded cursor-pointer">
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="font-semibold text-lg">{video.title}</h3>
            <p className="text-sm text-gray-500">{channelName}</p>
            <p className="text-sm text-gray-400">{video.views.toLocaleString()} views • {getTimeAgo(video.uploadDate)}</p>
          </>
        )}
      </div>
    </div>
  );
}
