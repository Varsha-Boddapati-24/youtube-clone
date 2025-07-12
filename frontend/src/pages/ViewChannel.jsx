import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import PublishedVideoCard from '../components/PublishedVideoCard';

export default function ViewChannel() {
    // Holds the selected video file for upload
    const [selectedVideo, setSelectedVideo] = useState(null);
    // Holds the selected thumbnail image
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);
    // Tracks title, description, category of the new video
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    // Upload progress and form feedback
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState("");
    // Holds all videos uploaded by the channel

    const [videos, setVideos] = useState([]);
    // Stores the channel's profile details
    const [channel, setChannel] = useState(null);
    // Stores validation errors for the upload form fields (e.g., missing title or thumbnail)
    const [errors, setErrors] = useState({});
    // Controls the visibility of the video upload modal
    const [showModal, setShowModal] = useState(false);
    // Tracks which video's options dropdown (3-dot menu) is currently open
    const [showDropdownId, setShowDropdownId] = useState(null);
    // Holds the ID of the video currently in edit mode (inline editing)
    const [editingVideoId, setEditingVideoId] = useState(null);
    // Temporarily stores the new title input value during editing
    const [editingTitle, setEditingTitle] = useState("");
    // Temporarily stores the new description input value during editing
    const [editingDescription, setEditingDescription] = useState("");
    // Tracks whether the page is loading channel and video data
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();
    const { user } = useAuth();

    // Fetch channel and videos once user is logged in
    useEffect(() => {
        if (user) {
            const loadData = async () => {
                setIsLoading(true);
                await Promise.all([fetchChannel(), fetchVideos()]);
                setIsLoading(false);
            };
            loadData();
        }
    }, [user]);

    // Fetch the channel's profile and metadata using its ID
    const fetchChannel = async () => {
        try {
            const res = await axios.get(`https://youtube-clone-vkhx.onrender.com/channels/${id}`, { withCredentials: true });
            setChannel(res.data);
        } catch (err) {
            console.error("Error fetching channel", err);
        }
    };
    // Fetch all videos uploaded by the channel
    const fetchVideos = async () => {
        try {
            const res = await axios.get(`https://youtube-clone-vkhx.onrender.com/videos/channel/${id}`);
            setVideos(res.data);
        } catch (err) {
            console.error("Error fetching videos", err);
        }
    };

    const handleEditSubmit = async (videoId) => {
        try {
            await axios.put(`https://youtube-clone-vkhx.onrender.com/videos/${videoId}`, {
                title: editingTitle,
                description: editingDescription
            }, { withCredentials: true });

            fetchVideos(); // Refresh the list after update
            setEditingVideoId(null);  // Close edit mode
        } catch (err) {
            console.error("Error updating video:", err);
        }
    };

    const handleDeleteVideo = async (videoId) => {
        try {
            await axios.delete(`https://youtube-clone-vkhx.onrender.com/videos/${videoId}`, { withCredentials: true });
            fetchVideos();
        } catch (err) {
            console.error(err);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!selectedVideo) newErrors.video = "Video file is required.";
        if (!selectedThumbnail) newErrors.thumbnail = "Thumbnail file is required.";
        if (!title.trim()) newErrors.title = "Title is required.";
        if (!description.trim()) newErrors.description = "Description is required.";
        if (!category.trim()) newErrors.category = "Category is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    // Upload video to server
    const handleUpload = async () => {
        if (!validateForm()) return;
        setIsUploading(true);
        setUploadSuccess("");
        // Create multipart/form-data for file upload
        const formData = new FormData();
        formData.append("videoFile", selectedVideo);
        formData.append("thumbnailFile", selectedThumbnail);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("channelId", id);

        try {
            await axios.post("https://youtube-clone-vkhx.onrender.com/videos/upload", formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            setUploadSuccess("🎉 Video uploaded successfully!");
            fetchVideos();// Refresh video list
            resetForm();
            setTimeout(() => {
                setShowModal(false);
                setUploadSuccess(""); // clear message after closing
            }, 2000); // show message for 2 seconds

        } catch (err) {
            console.error("Error uploading video", err);
            setUploadSuccess("Video upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };
    // Clear form fields after successful upload or cancel
    const resetForm = () => {
        setSelectedVideo(null);
        setSelectedThumbnail(null);
        setTitle("");
        setDescription("");
        setCategory("");
        setErrors({});
    };
    // Show loading spinner during initial data load
    if (isLoading) return (
        <div className="flex justify-center items-center h-screen">
            <Spinner />
        </div>
    );


    return (
        <div className="flex flex-col min-h-screen p-5">

            {/* ---------- Channel Banner Section ---------- */}
            {channel.channelBanner ? (
                // Banner Present
                <>
                    {/* Display banner image as background */}
                    <div className="w-full h-40 bg-cover bg-center rounded-lg  object-cover" style={{ backgroundImage: `url(${channel.channelBanner})` }}>
                        {/* <div className="w-full h-full bg-black bg-opacity-20 rounded-lg"></div> */}
                    </div>
                    {/* Display profile info below banner */}
                    <div className="flex items-center gap-6 px-12 mt-4 ">
                        {/* Channel avatar */}
                        <div className="w-20 h-20 sm:w-38 sm:h-38 rounded-full overflow-hidden border-4 border-white shadow-md bg-white">
                            <img
                                src={
                                    user?.avatarUrl
                                        ? user.avatarUrl

                                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(channel.channelName || "User")}&background=random`
                                }
                                alt="Profile"
                                className="w-20 h-20 sm:w-38 sm:h-38 object-cover"
                            />

                        </div>
                        {/* Channel name and description */}
                        <div>
                            <h1 className="text-3xl font-bold">{channel.channelName}</h1>
                            <p className="text-sm text-gray-400">{channel.subscribers} subscribers</p>
                            <p className="text-sm text-gray-500 mt-1">{channel.description}</p>
                        </div>
                    </div>
                </>
            ) : (
                // When banner is NOT present (just avatar and details)
                <div className="flex items-center gap-6 px-12 py-10">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md bg-white">
                        <img src={channel.channelAvatar} alt="Profile" className="w-full h-full object-cover" />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold">{channel.channelName}</h1>
                        <p className="text-sm text-gray-400">{channel.subscribers} subscribers</p>
                        <p className="text-sm text-gray-500 mt-1">{channel.description}</p>
                    </div>
                </div>
            )}



            {/* Create Video Section */}
            <div className="flex justify-start py-8 border-dotted">
                <div className="border border-gray-300 rounded-lg px-10 py-6 text-center  bg-white w-full">
                    <p className="text-lg mb-4">Upload and share videos to engage with your audience!</p>
                    {/* Upload modal toggle button */}
                    <button onClick={() => setShowModal(true)}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
                        + Upload Video
                    </button>
                </div>
            </div>

            {/* ---------- Published Videos Section ---------- */}

            <div className="px-2 mb-20">
                <h2 className="text-2xl font-semibold mb-4">Published</h2>

                <div className="space-y-4">
                    {videos.length === 0 ? (
                        <div className="text-center text-gray-500 py-10 text-lg">
                            No published videos yet.
                        </div>
                    ) : (
                        videos.map((video) => (
                            <div key={video._id} className="flex items-center justify-between  rounded-lg shadow-md p-3 relative">
                                <PublishedVideoCard
                                    key={video._id}
                                    video={video}
                                    channelName={channel.channelName}
                                    editingVideoId={editingVideoId}
                                    editingTitle={editingTitle}
                                    editingDescription={editingDescription}
                                    setEditingVideoId={setEditingVideoId}
                                    setEditingTitle={setEditingTitle}
                                    setEditingDescription={setEditingDescription}
                                    handleEditSubmit={handleEditSubmit}
                                />

                                {/* Three dot menu */}
                                <div className="relative">
                                    <button onClick={() => setShowDropdownId(showDropdownId === video._id ? null : video._id)} className='cursor-pointer width-1'>
                                        <i className="fa-solid fa-ellipsis-vertical text-lg"></i>
                                    </button>

                                    {showDropdownId === video._id && (
                                        <div className="absolute right-0 w-28 bg-white shadow rounded z-10">
                                            {/* Edit button */}
                                            <button
                                                onClick={() => {
                                                    setEditingVideoId(video._id);
                                                    setEditingTitle(video.title);
                                                    setEditingDescription(video.description);
                                                    setShowDropdownId(null);
                                                }}
                                                className="block w-full text-left px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                <i className="fa-solid fa-pencil cursor-pointer"></i> Edit
                                            </button>
                                            {/* Delete button */}
                                            <button
                                                onClick={() => handleDeleteVideo(video._id)}
                                                className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-red-500 cursor-pointer"
                                            >
                                                <i className="fa-solid fa-trash cursor-pointer"></i> Delete
                                            </button>
                                        </div>
                                    )}
                                </div>

                            </div>
                        )))}

                </div>
            </div>


            {/* ---------- Upload Modal ---------- */}
            {
                showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-8 rounded-lg w-full max-w-xl shadow-lg">

                            <h2 className="text-xl font-semibold mb-6 text-center">Upload New Video</h2>

                            {/* Upload Form Inputs */}
                            <div className="space-y-2">

                                {/* Video File */}
                                <div className="flex flex-col space-y-0.5">
                                    <label className="font-medium text-sm">Select Video File</label>
                                    <input type="file" onChange={(e) => {
                                        const file = e.target.files[0];
                                        setSelectedVideo(file);
                                    }} className="border p-2 rounded" />
                                    {errors.video && <p className="text-red-500 text-xs">{errors.video}</p>}
                                </div>

                                {/* Thumbnail File */}
                                <div className="flex flex-col space-y-0.5">
                                    <label className="font-medium text-sm">Select Thumbnail Image</label>
                                    <input type="file" onChange={(e) => setSelectedThumbnail(e.target.files[0])} className="border p-2 rounded" />
                                    {errors.thumbnail && <p className="text-red-500 text-xs">{errors.thumbnail}</p>}
                                </div>

                                {/* Title */}
                                <div className="flex flex-col space-y-0.5">
                                    <label className="font-medium text-sm">Title</label>
                                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}
                                        className="border p-2 rounded" />
                                    {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                                </div>

                                {/* Description */}
                                <div className="flex flex-col space-y-0.5">
                                    <label className="font-medium text-sm">Description</label>
                                    <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}
                                        className="border p-2 rounded" />
                                    {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
                                </div>

                                {/* Category */}
                                <div className="flex flex-col space-y-0.5">
                                    <label className="font-medium text-sm">Category</label>
                                    <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)}
                                        className="border p-2 rounded" />
                                    {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
                                </div>
                                {uploadSuccess && (
                                    <div className="text-green-600 text-sm font-medium text-center mt-2">
                                        {uploadSuccess}
                                    </div>
                                )}
                                {/* Buttons */}
                                <div className="flex justify-end space-x-3 pt-4">
                                    <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer">
                                        Cancel
                                    </button>

                                    <button
                                        onClick={handleUpload}
                                        className={`px-6 py-2 rounded-lg text-white font-semibold ${isUploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'}`}
                                        disabled={isUploading}
                                    >
                                        {isUploading ? 'Uploading' : 'Upload Video'}
                                    </button>
                                </div>

                            </div>



                        </div>
                    </div>
                )
            }

        </div >
    );
}
