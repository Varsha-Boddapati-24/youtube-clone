import { useState } from 'react';
import axios from 'axios';

export default function CommentsSection({ videoId, comments, setComments }) {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(`http://localhost:5000/comments/${videoId}`, { text: newComment }, { withCredentials: true });
      setComments(prev => [...prev, res.data]);
      setNewComment('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:5000/comments/${commentId}`, { withCredentials: true });
      setComments(prev => prev.filter(c => c._id !== commentId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="font-semibold text-lg mb-4">Comments</h2>

      <div className="flex gap-2 mb-4">
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border px-3 py-2 flex-1 rounded"
          placeholder="Add a comment"
        />
        <button onClick={handleAddComment} className="px-4 py-2 bg-blue-600 text-white rounded">
          Post
        </button>
      </div>

      <div className="space-y-3">
        {comments.map(comment => (
          <div key={comment._id} className="flex justify-between items-center bg-gray-100 p-3 rounded">
            <div>
              <p className="font-semibold">{comment.userId?.username}</p>
              <p>{comment.text}</p>
            </div>
            <button onClick={() => handleDeleteComment(comment._id)} className="text-red-500">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
