import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from "react-router-dom";
import { getTimeAgo } from '../utils/dateUtils';
import { useRef } from "react";

export default function CommentsSection({ videoId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [showDropdownId, setShowDropdownId] = useState(null);

  const { user } = useAuth();
  console.log("userrrrr", user)
  const navigate = useNavigate();
  const location = useLocation();
const inputRef = useRef();

useEffect(() => {
  if (isCommentBoxOpen) {
    inputRef.current?.focus();
  }
}, [isCommentBoxOpen]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/comments/video/${videoId}`);
        setComments(res.data);
      } catch (err) {
        console.error("Error fetching comments", err);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [videoId]);

  const handleCommentInputClick = () => {
    if (!user) {
      setShowSignInModal(true);
    } else {
      setIsCommentBoxOpen(true);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        `http://localhost:5000/comments`,
        {
          videoId: videoId,
          userId: user._id,
          text: newComment
        },
        { withCredentials: true }
      );
      const result = await axios.get(`http://localhost:5000/comments/video/${videoId}`);
    setComments(result.data);
      // setComments(prev => [...prev, res.data]);
      setNewComment('');
      setIsCommentBoxOpen(false);
    } catch (err) {
      console.error("Error adding comment", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:5000/comments/${commentId}`, { withCredentials: true });
      setComments(prev => prev.filter(c => c._id !== commentId));
    } catch (err) {
      console.error("Error deleting comment", err);
    }
  };

  const handleEditSubmit = async () => {
    if (!editingText.trim()) return;
    try {
      const res = await axios.put(
        `http://localhost:5000/comments/${editingCommentId}`,
        { text: editingText },
        { withCredentials: true }
      );

      setComments(prev =>
        prev.map(c => c._id === editingCommentId ? { ...c, text: res.data.text } : c)
      );
      setEditingCommentId(null);
      setEditingText('');
    } catch (err) {
      console.error("Error updating comment", err);
    }
  };

  if (loading) return <p>Loading comments...</p>;

  return (


    <div className="mt-6">
      <h2 className="font-semibold text-lg mb-3">{comments.length} Comments</h2>

      {/* Add Comment Section */}
      <div className="mb-4 flex gap-2">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user? user.username: "")}&background=random`}
            alt={user?.username}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>

        {!isCommentBoxOpen ? (
          <div
            onClick={handleCommentInputClick}
            className="border-b w-full px-3 py-2 text-gray-500 cursor-pointer"
          >
            Add a comment...
          </div>
        ) : (
          <div className="w-full">
            <input
             ref={inputRef}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="border-b w-full px-2 py-1 focus:outline-none "
              placeholder="Add a comment..."
            />
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

      {/* Inline Sign In Popup */}
      {showSignInModal && (
        <div className="relative">
          <div className="absolute top-0 left-0 bg-white shadow-lg p-6 rounded-lg w-80 z-50 border">
            <h2 className="text-lg font-semibold mb-2">Want to join the conversation?</h2>
            <p className="text-sm text-gray-600 mb-4">Sign in to continue</p>
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
            <button
              onClick={() => setShowSignInModal(false)}
              className="mt-3 text-sm text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-5">
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
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">@{comment.userId?.username}</span>
                    <span className="text-xs text-gray-500">
                      {getTimeAgo(new Date(comment.createdAt))}
                    </span>
                  </div>

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

                {/* Editable or Normal Comment */}
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

                {/* Actions Row */}
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
