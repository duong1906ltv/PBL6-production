import React, { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import FriendMessages from "./friend";
import MyMessages from "./my";
import ChatFooter from "../chat-footer";
import "./messenger.scss";
import axios from "axios";

function Messages(props) {
	const [friend, setFriend] = useState([]);

	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await axios(
					"/api/user/byid?userId=" + props.friendId
				);
				setFriend(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getUser();
	}, [props.friendId]);

	return (
		<div className="messages-content">
			<div className="messages-content__header">
				<div className="avatar">
					<img alt="" src={friend.avatar} />
				</div>
				<div className="name">{friend.username}</div>
				<AiOutlineInfoCircle className="icon" />
			</div>
			<div className="messages-content__messanges">
				{props.listmessages.map((item) =>
					item.sender !== props.friendId ? (
						<MyMessages message={item.text} />
					) : (
						<FriendMessages
							message={item.text}
							avatar={friend.avatar}
						/>
					)
				)}
			</div>
			<ChatFooter
				handleSubmit={props.handleSubmit}
				setNewMessage={props.setNewMessage}
				newMessage={props.newMessage}
			/>
		</div>
	);
}
export default Messages;
