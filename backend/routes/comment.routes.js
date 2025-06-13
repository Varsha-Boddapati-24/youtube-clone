import express from 'express';
import { addComment, editComment, deleteComment, getCommentsByVideoId } from '../controllers/comment.controller.js';
import authenticateUser from '../middlewares/authenticate.js';
const commentRouter = express.Router();

commentRouter.post("/",authenticateUser, addComment);
commentRouter.put("/:id", authenticateUser,editComment);
commentRouter.delete("/:id", authenticateUser,deleteComment);
commentRouter.get("/video/:videoId", getCommentsByVideoId);

export default commentRouter;
