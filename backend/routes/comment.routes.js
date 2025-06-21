import express from 'express';
import { addComment, editComment, deleteComment, getCommentsByVideoId } from '../controllers/comment.controller.js';
import authenticateUser from '../middlewares/authenticate.js';
const commentRouter = express.Router();
// @route   POST /comments - Add a new comment
commentRouter.post("/",authenticateUser, addComment);
// @route   PUT /comments/:id - Edit a comment by ID
commentRouter.put("/:id", authenticateUser,editComment);
// @route   DELETE /comments/:id - Delete a comment by ID
commentRouter.delete("/:id", authenticateUser,deleteComment);
// @route   GET /comments/video/:videoId - Get all comments for a video
commentRouter.get("/video/:videoId", getCommentsByVideoId);

export default commentRouter;
