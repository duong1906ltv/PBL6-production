import React from "react";
import { useAppContext } from "../../context/appContext";

import "./aleart.scss";

function Alert() {
    const { alertType, alertText } = useAppContext();

    return (
        <div className="aleart-container">
            <div className={`alert alert-${alertType}`}>{alertText}</div>
        </div>
    );
}

export default Alert;
