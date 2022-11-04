import React from "react";
import { useNavigate } from "react-router-dom";
import "./friend-tag.scss";

function FriendTag(props) {
    const navigate = useNavigate();
    const { avatar, name, status } = props.data
    return (
        <div className="friend-tag"  onClick={() => navigate("/")}>
            <img src={avatar} alt=""/>
            <span>{name}</span>
            { status && <div className="point-blue"></div> }
        </div>
    );
}
export default FriendTag;
