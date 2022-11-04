import express from "express";
const router = express.Router();

import {
	getMessage,
	addMessage,
	getLastMessage,
} from "../controllers/messageController.js";

router.route("/").post(addMessage);
router.route("/:conversationId").get(getMessage);
router.route("/").get(getLastMessage);

export default router;
