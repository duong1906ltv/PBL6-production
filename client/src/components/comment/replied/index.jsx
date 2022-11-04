import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Emoji from "../../emoji";
import "./replied-comment.scss";
function RepliedComment(props) {
  const { name, comment, time } = props.data;
  const [showEmoji, setShowEmoji] = useState(false);
  return (
    <div className="reply-comment-container">
      <img
        className="img-circle"
        alt=""
        src="https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/272740616_263250102607306_1378803341329231688_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=174925&_nc_ohc=W3Xn835mVksAX9bmGxt&tn=fQqaHM4RDMemO35s&_nc_ht=scontent.fdad1-3.fna&oh=00_AT8k0MGw5LZUoQz4On6lsxQy4Ch33gdVfDHwJhon_pcW6g&oe=63273A70"
      />
      <div className="ms-2">
        <div className="reply-comment-container__text">
          <a className="user-name" href="/">
            {name}
          </a>
          <p>{comment}</p>
        </div>
        <div className="reply-comment-container__reply-action ms-3">
          <a
            className="position-relative"
            href="/"
            onMouseEnter={() => setShowEmoji(true)}
            onMouseLeave={() => setShowEmoji(false)}
          >
            <Emoji state={showEmoji} />
            Thích
          </a>
          <a href="/">Phản hồi</a>
          <label>{time}</label>
        </div>
      </div>
    </div>
  );
}

export default RepliedComment;
