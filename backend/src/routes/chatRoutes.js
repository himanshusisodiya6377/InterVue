import {getStreamToken} from "../controller/chatController.js";
import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

router.get("/token", protectedRoute, getStreamToken);

export default router;

//as we have logged in clark but to use stream feauture of video and chat we have to get token of it which we get through chat controller
