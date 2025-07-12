import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from "react-router-dom";
import { getTimeAgo } from '../utils/dateUtils';
import { useRef } from "react";
import Spinner from './Spinner';

export default function CommentsSection({ videoId }) {
  // State declarations
  const [comments, setComments] = useState([]); // All comments for current video
  const [newComment, setNewComment] = useState(''); // New comment input
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false); // Whether comment input box is open
  const [loading, setLoading] = useState(true);  // Loading state while fetching comments
  const [showSignInModal, setShowSignInModal] = useState(false);// Sign-in modal if user not logged in
  const [editingCommentId, setEditingCommentId] = useState(null);; // Currently editing comment ID
  const [editingText, setEditingText] = useState('');// Text for editing comment
  const [showDropdownId, setShowDropdownId] = useState(null);// Dropdown for edit/delete shown for which comment

  const { user } = useAuth();   // Get logged-in user from context
  const navigate = useNavigate();// For navigation on sign-in redirect
  const location = useLocation(); // Get current URL path for redirect back after sign-in
  const inputRef = useRef(); // Ref to auto focus comment input box

  // Auto-focus input when comment box opens
  useEffect(() => {
    if (isCommentBoxOpen) {
      inputRef.current?.focus();
    }
  }, [isCommentBoxOpen]);

  // Fetch all comments for the given video
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`https://youtube-clone-vkhx.onrender.com/comments/video/${videoId}`);
        setComments(res.data);
      } catch (err) {
        console.error("Error fetching comments", err);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [videoId]);


  // Handle clicking on "Add comment" box
  const handleCommentInputClick = () => {
    if (!user) {
      setShowSignInModal(true);// Ask user to sign-in if not logged in
    } else {
      setIsCommentBoxOpen(true);// Open comment input box
    }
  };

  // API CALL: Add comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;// Prevent empty comment submission
    try {
      const res = await axios.post(
        `https://youtube-clone-vkhx.onrender.com/comments`,
        {
          videoId: videoId,
          userId: user._id,
          text: newComment
        },
        { withCredentials: true }
      );
      //Updating comment list after successful insertion
      setComments(prev => [...prev, res.data]);
      setNewComment('');
      setIsCommentBoxOpen(false);
    } catch (err) {
      console.error("Error adding comment", err);
    }
  };

  // API CALL: Delete comment
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`https://youtube-clone-vkhx.onrender.com/comments/${commentId}`, { withCredentials: true });
      // Remove deleted comment from state
      setComments(prev => prev.filter(c => c._id !== commentId));
    } catch (err) {
      console.error("Error deleting comment", err);
    }
  };

  // API CALL: Edit comment
  const handleEditSubmit = async () => {
    if (!editingText.trim()) return;
    try {
      const res = await axios.put(
        `https://youtube-clone-vkhx.onrender.com/comments/${editingCommentId}`,
        { text: editingText },
        { withCredentials: true }
      );
      // Update comment list with updated text
      setComments(prev =>
        prev.map(c => c._id === editingCommentId ? { ...c, text: res.data.text } : c)
      );
      // Reset edit state
      setEditingCommentId(null);
      setEditingText('');
    } catch (err) {
      console.error("Error updating comment", err);
    }
  };
  // While loading show spinner
  if (loading) return <Spinner />;

  return (


    <div className="mt-6">
      {/* Total comments count */}
      <h2 className="font-semibold text-lg mb-3">{comments.length} Comments</h2>
{/* ------------------- ADD COMMENT SECTION ------------------- */}
    
      <div className="mb-4 flex gap-2">
        {/* User Avatar */}
        <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0">
          <img
            src={user?.username
              ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=random`
              : "/default-avatar.jpg"}
            alt={user?.username}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>

        {/* Comment Input Box */}
          {/* If comment box is closed, show 'Add comment...' placeholder */}
        {!isCommentBoxOpen ? (
          <div
            onClick={handleCommentInputClick}
            className="border-b w-full px-3 py-2 text-gray-500 cursor-pointer"
          >
            Add a comment...
          </div>
        ) : (
          <div className="w-full">
               {/* Input box for entering new comment */}
            <input
              ref={inputRef}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="border-b w-full px-2 py-1 focus:outline-none "
              placeholder="Add a comment..."
            />
           {/* Buttons: Cancel and Comment */}
            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={() => {
                  setIsCommentBoxOpen(false);
                  setNewComment("");
                }}
                className="text-sm text-gray-600 px-3 py-1 rounded-full hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddComment}
                className={`px-4 py-1.5 rounded-full text-white text-sm font-semibold transition ${newComment.trim()
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-300 cursor-not-allowed"
                  }`}
                disabled={!newComment.trim()}
              >
                Comment
              </button>
            </div>
          </div>
        )}
      </div>
 {/* ------------------- SIGN-IN MODAL ------------------- */}
      {/* Sign In Modal Popup */}
      {showSignInModal && (
        <div className="relative">
          <div className="absolute top-0 left-0 bg-white shadow-lg p-6 rounded-lg w-80 z-50 border">

            <h2 className="text-lg font-semibold mb-2">Want to join the conversation?</h2>
            <p className="text-sm text-gray-600 mb-4">Sign in to continue</p>
              {/* Sign In Button */}
            <button
              className="w-full bg-black text-white py-2 rounded text-md font-semibold"
              onClick={() => {
                setShowSignInModal(false);
                const currentPath = location.pathname;
                navigate(`/signin?redirect=${encodeURIComponent(currentPath)}`);
              }}
            >
              Sign In
            </button>
             {/* Cancel Button */}
            <button
              onClick={() => setShowSignInModal(false)}
              className="mt-3 text-sm text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

         {/* ------------------- COMMENTS LIST ------------------- */}
      <div className="space-y-5">
         {/* Show message when no comments exist */}
        {comments.length === 0 ? (
          <p className="text-sm text-gray-400">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="flex items-start gap-3">
              {/* Avatar */}
              <div className="w-8 h-8">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(comment.userId?.username)}&background=random`}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>

              {/* Comment Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  {/* Username & Timestamp Row */}
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">@{comment.userId?.username}</span>
                    <span className="text-xs text-gray-500">
                      {getTimeAgo(new Date(comment.createdAt))}
                    </span>
                  </div>
                   {/* Edit/Delete Dropdown for Own Comments */}
                  {user && user._id === comment.userId?._id && (
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowDropdownId(
                            showDropdownId === comment._id ? null : comment._id
                          )
                        }
                      >
                        <i className="fa-solid fa-ellipsis-vertical cursor-pointer w-2"></i>
                      </button>

                      {showDropdownId === comment._id && (
                        <div className="absolute right-0 w-28  bg-white shadow rounded z-10  ">
                          <button
                            onClick={() => {
                              setEditingCommentId(comment._id);
                              setEditingText(comment.text);
                              setShowDropdownId(null);
                            }}
                            className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                          >
                            <i className="fa-solid fa-pencil"></i> edit

                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment._id)}
                            className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-red-500"
                          >
                            <i className="fa-solid fa-trash"></i> delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

           {/* Show either Edit Input or Comment Text */}
                {editingCommentId === comment._id ? (
                  <>
                    <input
                      className="border-b w-full py-2  outline-none"
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                    <div className="flex justify-end gap-3 mt-2">
                      <button
                        onClick={() => setEditingCommentId(null)}
                        className="text-sm text-gray-600 px-3 py-1 rounded-full hover:bg-gray-200"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={handleEditSubmit}
                        className={`px-4 py-1.5 rounded-full text-white text-sm font-semibold transition ${editingText.trim()
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-gray-300 cursor-not-allowed"
                          }`}
                        disabled={!editingText.trim()}
                      >
                        Save
                      </button>
                    </div>

                  </>
                ) : (
                  <p className="text-sm">{comment.text}</p>
                )}

                {/* Like / Dislike / Reply buttons */}
                <div className="flex items-center gap-4 text-gray-500 text-sm mt-1">
                  <button><i className="fa-regular fa-thumbs-up"></i></button>
                  <button><i className="fa-regular fa-thumbs-down"></i></button>
                  <button>Reply</button>
                </div>
              </div>
            </div>
          ))

        )}
      </div>
    </div>

  )
}
