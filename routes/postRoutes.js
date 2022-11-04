import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";

import {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    predict,
} from "../controllers/postController.js";

router.route("/").post(authenticateUser, createPost).get(getAllPosts);
router
    .route("/:id")
    .get(getPostById)
    .delete(authenticateUser, deletePost)
    .put(authenticateUser, updatePost);
router.route("/predict").post(predict)

export default router;
