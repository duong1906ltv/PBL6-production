import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "timeago.js";

import "./chat-bar.scss";

function ChatBar(props) {
	const [user, setUser] = useState([]);
	const [lastMessage, setLastMessage] = useState([]);


	useEffect(() => {
		const userId = props.conversation.members.find(
			(m) => m !== props.currentUser._id
		);
		const conversationId = props.conversation._id;

		const getUserAndLastMessage = async () => {
			try {
				const res = await axios(
					"/api/message?conversationId=" +
						conversationId +
						"&userId=" +
						userId
				);
				setUser(res.data.user);
				setLastMessage(res.data.message);
			} catch (err) {
				console.log(err);
			}
		};
		getUserAndLastMessage();
	}, [props.conversation, props.currentUser]);
	return (
		<div className="chat-bar-content px-3">
			<div className="avatar">
				<img src={user.avatar} alt="" />
			</div>
			<div className="name">
				<div>{user.username}</div>
				{lastMessage && (
					<div>
						{lastMessage.text}・{format(lastMessage.createdAt)}{" "}
					</div>
				)}
			</div>
		</div>
	);
}
export default ChatBar;
