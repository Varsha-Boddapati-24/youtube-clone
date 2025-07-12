import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";


export default function CreateChannelModal({ onClose }) {
  // States to store form fields
  const [channelName, setChannelName] = useState("");      // Channel Name input
  const [description, setDescription] = useState("");      // Channel Description input
  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
  const [selectedBannerFile, setSelectedBannerFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null); // Local preview for selected avatar file
  const [successMessage, setSuccessMessage] = useState(""); // Success message after creation
  const [formError, setFormError] = useState("");          // Form validation or server errors
  const [isLoading, setIsLoading] = useState(false);


  const { fetchUser , setUser} = useAuth(); // Used to refresh user data after successful channel creation

  // Handle file input change for avatar upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);// Save base64 string for preview
      };
      reader.readAsDataURL(file);// Convert file into base64 string
    }
  };

  const handleBannerFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedBannerFile(file);
    }
  };

  // Client-side form validation
  const validate = () => {
    if (!channelName.trim()) {
      setFormError("Channel name is required.");
      return false;
    }
    if (!description.trim()) {
      setFormError("Description is required.");
      return false;
    }
    setFormError(""); // Clear error if valid
    return true;
  };

  // Submit channel creation form
  const handleSubmit = async () => {
    setFormError("");
    if (!validate()) return
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("channelName", channelName);
      formData.append("description", description);
      if (selectedAvatarFile) formData.append("channelAvatar", selectedAvatarFile);
      if (selectedBannerFile) formData.append("channelBanner", selectedBannerFile);
      // API call to create new channel
      const res = await axios.post("https://youtube-clone-vkhx.onrender.com/channels/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      // On successful channel creation
      setSuccessMessage("🎉 Channel created successfully!");

      await fetchUser();// Refresh user context data to reflect new channel

      // Close modal after short delay
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);

      // Handle server errors
      if (err.response && err.response.data?.message) {
        setFormError(err.response.data.message);
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    }
    finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-white rounded-xl w-[90%] max-w-md p-6 shadow-xl">
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl cursor-pointer ">
          &times;
        </button>

        {/* ------------------ AVATAR SELECTION ------------------- */}
        <div className="flex flex-col items-center mb-5">

          {/* Avatar Preview or Placeholder Icon */}
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-4xl shadow">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar" className="rounded-full w-full h-full object-cover" />
            ) : (
              <i className="fa-solid fa-user"></i>
            )}
          </div>
          {/* Avatar Upload Button */}
          <label className="mt-2 text-sm text-blue-600 font-medium cursor-pointer hover:underline">
            Select Picture
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>
        {/* ------------------ FORM INPUTS ------------------- */}
        <div className="space-y-3">
          {/* Channel Name Input */}
          <input
            type="text"
            placeholder="Channel Name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
          />
          {/* Channel Description Input */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
          />
          {/* Channel Banner Image URL (optional) */}
          <div className="flex flex-col">
            <label className="text-sm  mb-1 ">Select Banner Image</label>
            <input type="file" accept="image/*" onChange={handleBannerFileChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            />
          </div>

          {/* Terms Notice */}
          <p className="text-xs text-gray-500 mt-2">
            By clicking <strong>Create</strong>, you agree to our{" "}
            <span className="text-blue-600 underline cursor-pointer">terms and conditions</span>.
          </p>
        </div>
        {/* ------------------ SUCCESS & ERROR MESSAGES ------------------- */}
        {successMessage && (
          <div className="text-green-600 text-sm mt-3 font-medium text-center">
            {successMessage}
          </div>
        )}
        {formError && (
          <div className="text-red-600 text-sm mt-3 font-medium">
            {formError}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end mt-5">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-1 rounded-md font-semibold cursor-pointer"
          >
            {isLoading ? "Creating..." : "Create Channel"}
          </button>
        </div>
      </div>
    </div>
  );
}
