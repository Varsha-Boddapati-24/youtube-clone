import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";


export default function CreateChannelModal({ onClose }) {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [channelBanner, setChannelBanner] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [formError, setFormError] = useState("");
  const { fetchUser } = useAuth();


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
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

  const handleSubmit = async () => {
    setFormError("");
    if (!validate()) return
    try {
      const res = await axios.post(
        "http://localhost:5000/channels/create",
        {
          channelName,
          description,
          channelBanner,
        },
        {
          withCredentials: true,
        }
      );
      setSuccessMessage("🎉 Channel created successfully!");
      // Optional: refresh user context if you have that logic
      await fetchUser();
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data?.message) {
        setFormError(err.response.data.message);
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    }
  };


  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-white rounded-xl w-[90%] max-w-md p-6 shadow-xl">
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl cursor-pointer ">
          &times;
        </button>

        {/* Avatar + Upload */}
        <div className="flex flex-col items-center mb-5">
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-4xl shadow">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar" className="rounded-full w-full h-full object-cover" />
            ) : (
              <i className="fa-solid fa-user"></i>
            )}
          </div>
          <label className="mt-2 text-sm text-blue-600 font-medium cursor-pointer hover:underline">
            Select Picture
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        {/* Form */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Channel Name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
          />

          <input
            type="text"
            placeholder="Banner Image URL (optional)"
            value={channelBanner}
            onChange={(e) => setChannelBanner(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
          />

          {/* Terms Notice */}
          <p className="text-xs text-gray-500 mt-2">
            By clicking <strong>Create</strong>, you agree to our{" "}
            <span className="text-blue-600 underline cursor-pointer">terms and conditions</span>.
          </p>
        </div>
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-1 rounded-md font-semibold"
          >
            Create Channel
          </button>
        </div>
      </div>
    </div>
  );
}
