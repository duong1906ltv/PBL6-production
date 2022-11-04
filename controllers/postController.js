import User from "../models/User.js";
import Post from "../models/Post.js";
import { StatusCodes } from "http-status-codes";
import { spawn } from "child_process";
import checkPermissions from "../utils/checkPermissions.js";

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("user")
            .sort({ createdAt: -1 });
        res.status(StatusCodes.OK).json(posts);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("user");

        if (!post) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ msg: "Post not found" });
        }

        res.status(StatusCodes.OK).json(post);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
};

const createPost = async (req, res) => {
    try {
        let predictionVal = "0";
        const python = spawn("python3", ["predict.py", req.body.text]);
        python.stdout.on("data", (data) => {
          predictionVal = data.toString();
          const newPost = new Post({
            text: req.body.text,
            user: req.user.userId,
        });
          newPost.status = predictionVal.substring(0,1);
          newPost.save();

        });
        res.status(StatusCodes.OK).json("Create post success");
    } catch (err) {
        console.error(err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
};

const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ msg: "Post not found" });
        }
        checkPermissions(req.user, post.user);

        const updatedPost = await Post.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        res.status(StatusCodes.OK).json({ updatedPost });
    } catch (err) {
        console.error(err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ msg: "Post not found" });
        }

        checkPermissions(req.user, post.user);

        await post.remove();

        res.status(StatusCodes.OK).json({ msg: "Post removed" });
    } catch (err) {
        console.error(err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
};

const predict = async (req, res) => {
    try {
        const text = req.body.text;
        let predictionVal = "0";
        const python = spawn("python3", ["predict.py", text]);
        python.stdout.on("data", (data) => {
          console.log("python data: ", data.toString());
          predictionVal = data.toString();
        });
        python.on("close", (code, signal) =>
          console.log(`process closed: code ${code} and signal ${signal}`)
        );
        setTimeout(() => {
            res.json(predictionVal.substring(0,1))
        }, 1000);
    } catch (err) {
        console.error(err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
};

export {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    predict,
};
