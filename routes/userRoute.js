import express from "express";
const router = express.Router();
import upload from "../middleware/upload.js";
import authenticateUser from "../middleware/auth.js";

import {
    getAll,
    getProfileById,
    updateUserAvatar,
    sendInvitation,
    acceptInvitation,
    getMyInvitation,
    getUserById,
} from "../controllers/userController.js";

router.route("/").get(getAll);
router.route("/byid/").get(getUserById);
router.route("/:id").get(getProfileById);
router.route("/accept-invitation").patch(authenticateUser, acceptInvitation);
router.route("/send-invitation").patch(authenticateUser, sendInvitation);
router.route("/invitation/me").get(authenticateUser,getMyInvitation);
router
    .route("/avatar")
    .patch(upload.single("image"), authenticateUser, updateUserAvatar);

export default router;
