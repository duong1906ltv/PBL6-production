import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import RepliedComment from "./replied";
import ReplyingComment from "./replying";
import Emoji from "../emoji";
import "./comment.scss";
function Comment(props) {
    const { name, comment, time, reply } = props.data;
    const [showReplying, setShowReplying] = useState(false);
    const [showRepliedComment, setShowRepliedComment] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);
    return (
        <div className="comment-container">
            <img
                className="img-circle"
                alt=""
                src="https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/272740616_263250102607306_1378803341329231688_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=174925&_nc_ohc=W3Xn835mVksAX9bmGxt&tn=fQqaHM4RDMemO35s&_nc_ht=scontent.fdad1-3.fna&oh=00_AT8k0MGw5LZUoQz4On6lsxQy4Ch33gdVfDHwJhon_pcW6g&oe=63273A70"
            />
            <div className="ms-2">
                <div className="comment-container__text">
                    <a className="user-name" href="/">
                        {name}
                    </a>
                    <p>{comment}</p>
                </div>
                <div className="comment-container__reply-action ms-3">
                    <a
                        className="position-relative"
                        href="/"
                        onMouseEnter={() => setShowEmoji(true)}
                        onMouseLeave={() => setShowEmoji(false)}
                    >
                        <Emoji state={showEmoji} />
                        Thích
                    </a>
                    <a
                        href="/"
                        onClick={() => {
                            setShowReplying(true);
                            setShowRepliedComment(true);
                        }}
                    >
                        Phản hồi
                    </a>
                    <label>{time}</label>
                </div>
                <div
                    className="ms-3"
                    onClick={() => {
                        setShowRepliedComment(!showRepliedComment);
                        setShowReplying(false);
                    }}
                >
                    {reply && (
                        <>
                            <div className="comment-container__reply">
                                <div className="me-3 line"> </div>
                                <span style={{ fontWeight: "600" }}>
                                    {!showRepliedComment
                                        ? reply?.length + " Phản hồi"
                                        : "Ẩn phản hồi"}
                                </span>
                            </div>
                            {showRepliedComment &&
                                reply.map((reply) => (
                                    <RepliedComment data={reply} />
                                ))}
                        </>
                    )}
                    {showReplying && <ReplyingComment />}
                </div>
            </div>
        </div>
    );
}

export default Comment;
