import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./emoji.scss";
function Emoji({ state }) {
  return (
    state && (
      <div className="emoji">
        <img
          className="img-circle"
          style={{ width: "35px" }}
          src={require("../../assets/images/like.png")}
          alt=""
        />
        <img
          className="img-circle"
          style={{ width: "35px" }}
          src={require("../../assets/images/heart.png")}
          alt=""
        />
        <img
          className="img-circle"
          style={{ width: "35px" }}
          src={require("../../assets/images/haha.png")}
          alt=""
        />
        <img
          className="img-circle"
          style={{ width: "35px" }}
          src={require("../../assets/images/wow.png")}
          alt=""
        />
        <img
          className="img-circle"
          style={{ width: "35px" }}
          src={require("../../assets/images/sad.png")}
          alt=""
        />
        <img
          className="img-circle"
          style={{ width: "35px" }}
          src={require("../../assets/images/angry.png")}
          alt=""
        />
      </div>
    )
  );
}

export default Emoji;
