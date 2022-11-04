import React from "react";

import "./my-messenger.scss";

function MyMessages(props) {
    return (
        <div className="my-messages-content">
            <div className="messange">{props.message}</div>
        </div>
    );
}
export default MyMessages;
