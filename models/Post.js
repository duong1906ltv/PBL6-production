import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"],
    },
    text: {
        type: String,
    },
    status: {
        type: String,
    },
    likes: [
        {
            user: {
                type: mongoose.Types.ObjectId,
            },
        },
    ],
    comments: [
        {
            user: {
                type: mongoose.Types.ObjectId,
            },
            text: {
                type: String,
                required: true,
            },
            name: {
                type: String,
            },
            avatar: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Post", PostSchema);
