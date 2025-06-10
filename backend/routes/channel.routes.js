import express from "express";
import { createChannel } from "../controllers/channel.controller.js";
import authenticateUser from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/create", authenticateUser, createChannel);

export default router;
