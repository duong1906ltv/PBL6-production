import Message from "../models/Message.js";
import User from "../models/User.js";

const addMessage = async (req, res) => {
	const newMessage = new Message(req.body);

	try {
		const savedMessage = await newMessage.save();
		res.status(200).json(savedMessage);
	} catch (err) {
		res.status(500).json(err);
	}
};

const getMessage = async (req, res) => {
	try {
		const messages = await Message.find({
			conversationId: req.params.conversationId,
		});
		res.status(200).json(messages);
	} catch (err) {
		res.status(500).json(err);
	}
};

const getLastMessage = async (req, res) => {
	const { conversationId, userId } = req.query;
	try {
		const message = await Message.findOne({
			conversationId: conversationId,
		}).sort({ createdAt: -1 });
		const user = await User.findById(userId);
		res.status(200).json({ message, user });
	} catch (err) {
		res.status(500).json(err);
	}
};

export { addMessage, getMessage, getLastMessage };
