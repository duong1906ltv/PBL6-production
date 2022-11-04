import React, { useEffect, useRef, useState } from "react";
import Messages from "../../../components/messenger";
import ChatBar from "../../../components/chat-bar";
import "./chat.scss";
import { io } from "socket.io-client";
import axios from "axios";
import { useAppContext } from "../../../context/appContext";

function Chat() {
	const [currentChat, setCurrentChat] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const ENDPOINT = "https://kuruku.onrender.com/";
	const socket = useRef(io(ENDPOINT));
	const { user, getMyConversation, listConversations } = useAppContext();
	const scrollRef = useRef();

	useEffect(() => {
		getMyConversation();
		socket.current = io(ENDPOINT);
		socket.current.on("getMessage", (data) => {
			setArrivalMessage({
				sender: data.senderId,
				text: data.text,
				createdAt: Date.now(),
			});
		});
	}, []);

	useEffect(() => {
		arrivalMessage &&
			currentChat?.members.includes(arrivalMessage.sender) &&
			setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage, currentChat]);

	useEffect(() => {
		socket.current.emit("addUser", user._id);
		socket.current.on("getUsers", (users) => {
			console.log(users);
		});
	}, [user]);

	useEffect(() => {
		const getMessages = async () => {
			try {
				const res = await axios.get("/api/message/" + currentChat?._id);
				setMessages(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getMessages();
	}, [currentChat]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (newMessage === "") {
			return;
		}
		const message = {
			sender: user._id,
			text: newMessage,
			conversationId: currentChat._id,
		};

		const receiverId = currentChat.members.find(
			(member) => member !== user._id
		);

		socket.current.emit("sendMessage", {
			senderId: user._id,
			receiverId,
			text: newMessage,
		});

		try {
			const res = await axios.post("/api/message", message);
			setMessages([...messages, res.data]);
			setNewMessage("");
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div className="chat-container">
			<div className="chat-content col-12">
				<div className="border-right">
					<div className="border-bottom py-3 text-center">
						<div className="m-auto">
							<h6 className="my-0">h_hiuu</h6>
						</div>
					</div>
					<div className="chat-bar">
						{listConversations.map((c) => (
							<div onClick={() => setCurrentChat(c)}>
								{" "}
								<ChatBar
									conversation={c}
									currentUser={user}
								/>{" "}
							</div>
						))}
					</div>
				</div>
				<div className="d-flex flex-column position-relative">
					{currentChat ? (
						<Messages
							listmessages={messages}
							friendId={currentChat.members.find(
								(x) => x !== user._id
							)}
							handleSubmit={handleSubmit}
							setNewMessage={setNewMessage}
							newMessage={newMessage}
						/>
					) : (
						<div className="text-center m-auto">
							<h4>Your Messages</h4>
							<p>Hãy gửi tin nhắn và ảnh cho bạn bè hoặc nhóm</p>
							<button>Gửi tin nhắn</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Chat;
