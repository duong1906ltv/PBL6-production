import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";

import {
  getConversationFromUser,
  addNewConversation,
  getConversationFromTwoUser,
  getConversationById,
  getMyConversation,
} from "../controllers/conversationController.js";

router
  .route("/")
  .post(addNewConversation)
  .get(authenticateUser, getMyConversation);
router.route("/:userId").get(getConversationFromUser);
router.route("/byId/:id").get(getConversationById);
router
  .route("/find/:firstUserId/:secondUserId")
  .get(getConversationFromTwoUser);

export default router;
