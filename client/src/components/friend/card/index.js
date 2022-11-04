import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/appContext";
import "./friend-card.scss";

const ALL_FRIENDS_TAB = 1;
const INVITATION_TAB = 2;

function FriendCard(props) {
    const navigate = useNavigate();
    const { fullName, user } = props.data;
    const tabStatus = props.tabStatus
    const { sendInvitation, acceptInvitation } = useAppContext()
    const handleSendInvitation = () => {
        sendInvitation(user._id);
        window.location.reload(false)
    }
    const handleAcceptInvitation = () => {
        acceptInvitation(user._id);
        window.location.reload(false)
    }
    const width = window.location.pathname.includes("friend") ? "24%" : "32%"
    return (
        <div className="friend-card" style={{width: width}} onClick={() => navigate(`/users/${user._id}`)}>
            <img src={user?.avatar} alt="" />
            <div className="p-2 mx-1">
                <p>{fullName !=="" ? fullName : user.username}</p>
                <span>10 bạn chung</span>
                {
                    tabStatus !== ALL_FRIENDS_TAB
                        ? tabStatus === INVITATION_TAB
                            ? <button className="btn-blue" onClick={handleAcceptInvitation}>Xác nhận</button>
                            : <button className="btn-blue" onClick={handleSendInvitation}>Kết bạn</button>
                        : <button className="btn-blue" onClick={() => navigate("/chat")}>Nhắn tin</button> 

                }
                    { 
                        tabStatus === ALL_FRIENDS_TAB 
                        ? <button className="btn-gray" onClick={handleAcceptInvitation}>Hủy kết bạn</button>
                        : <button onClick={() => navigate("/chat")}>Nhắn tin</button>
                    }
            </div>
        </div>
    );
}
export default FriendCard;
