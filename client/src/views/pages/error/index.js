import React from "react";
import { useNavigate } from "react-router-dom";
import "./error.scss";

function Error() {
    const navigate = useNavigate();
    return (
        <div className="error-container">
            <img src={require("../../../assets/images/page-not-found.jpg")} alt=""/>
            <h1>Page not found</h1>
            <h4>Sorry, we couldn't find the page you are looking for </h4>
            <button className="button" onClick={() => navigate(-1)}>Go back</button>
        </div>
    );
}

export default Error;
