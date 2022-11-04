import { StatusCodes } from "http-status-codes";
import Conversation from "../models/Conversation.js";

const addNewConversation = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getMyConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.user.userId] },
    });
    res.status(StatusCodes.OK).json(conversation)
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const getConversationFromUser = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getConversationFromTwoUser = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getConversationById = async (req, res) => {
  const { id: conversationId } = req.params;
  try {
    const conversation = await Conversation.findOne({ _id: conversationId });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  addNewConversation,
  getConversationFromUser,
  getConversationFromTwoUser,
  getConversationById,
  getMyConversation,
};
