import React from "react";
import "./friend-mesenger.scss";

function FriendMessages(props) {
    return (
        <div className="friend-messages-content">
            <div className="avatar">
                <img alt="" src={props.avatar} />
            </div>
            <div className="messange">{props.message}</div>
        </div>
    );
}
export default FriendMessages;
