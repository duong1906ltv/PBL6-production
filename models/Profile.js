import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"],
    },
    fullName: {
        type: String,
        default: "",
    },
    gender: {
        type: Boolean,
        default: true,
    },
    dayOfBirth: {
        type: Date,
        default: Date.now,
    },
    address: {
        type: String,
        default: "",
    },
    phoneNumber: {
        type: String,
        default: "",
    },
    hoppy: {
        type: String,
        default: "",
    },
    friends: {
        type: Array,
        default: [],
    },
    invitation_send: {
        type: Array,
        default: [],
    },
    invitation_receive: {
        type: Array,
        default: [],
    },
});
export default mongoose.model("Profile", ProfileSchema);
