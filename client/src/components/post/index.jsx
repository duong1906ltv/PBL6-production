import React, { useState, useRef } from "react";
import { Carousel } from "antd";
import Comment from "../comment";
import Emoji from "../emoji";
import { getDate } from "../../helpers/formatDate";
import { listComment, listPostsImages } from "../../utils";
import "./post.scss";

function Post(props) {
  const slider = useRef();
  const { user, text, createdAt, status } = props.data;
  const [showComment, setShowComment] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const dateOfPost = new Date(createdAt);
  var minutes = Math.floor((new Date() - dateOfPost) / 60000);
  if (minutes === 0) minutes = 1;
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const [showHiddenPost, setShowHiddenPost] = useState(false);


  // 7
  return (
    <div className={"post-container " + (!showHiddenPost && status === "0" ? "is-hidden" : "")}>
      <div className="post-content">
        <div className="mx-3">
          <div className="d-flex align-items-center">
            <div className="shape-circle">
              <img
                className="img-circle"
                style={{ width: "50px", height: "50px" }}
                alt=""
                src={user.avatar}
              />
            </div>
            <div className="ms-3">
              <a className="user-name" href="/">
                {user.username}
              </a>
              <br />
              <span>
                {new Date().getYear() > dateOfPost.getYear() ||
                new Date().getMonth() > dateOfPost.getMonth() ||
                new Date().getDate() < dateOfPost.getDate() + 7
                  ? new Date().getDate() === dateOfPost.getDate()
                    ? hours <= 0
                      ? minutes + " phút trước"
                      : hours + " giờ trước"
                    : days + " ngày trước"
                  : getDate(createdAt)}
              </span>
            </div>
          </div>
          <p className="mt-2">{text}</p>
        </div>
        <div className="position-relative">
          <Carousel
            className="post-container__list-images"
            ref={(ref) => {
              slider.current = ref;
            }}
          >
            {listPostsImages.map((image) => (
              <img alt="" src={image} />
            ))}
          </Carousel>
          <div
            className="post-container__list-images__btn-prev"
            onClick={() => slider.current.prev()}
          >
            <img alt="" src={require("../../assets/images/btn-prev.png")} />
          </div>
          <div
            className="post-container__list-images__btn-next"
            onClick={() => slider.current.next()}
          >
            <img alt="" src={require("../../assets/images/btn-next.png")} />
          </div>
        </div>
        <div className="post-container__bottom mx-3">
          <div className="d-flex align-item-center">
            <img
              className="img-circle"
              style={{ width: "20px" }}
              src={require("../../assets/images/like.png")}
              alt=""
            />
            <img
              className="img-circle"
              style={{ width: "20px" }}
              src={require("../../assets/images/heart.png")}
              alt=""
            />
            <img
              className="img-circle"
              style={{ width: "20px" }}
              src={require("../../assets/images/haha.png")}
              alt=""
            />
            <span className="ms-2">120</span>
          </div>
          <div className="post-container__bottom__action">
            <div
              className="col-4"
              onMouseEnter={() => setShowEmoji(true)}
              onMouseLeave={() => setShowEmoji(false)}
            >
              <Emoji state={showEmoji} />
              <p>Thích</p>
            </div>
            <div className="col-4" onClick={() => setShowComment(true)}>
              <p>Bình luận</p>
            </div>
            <div className="col-4">
              <p>Chia sẻ</p>
            </div>
          </div>
          <div className="post-container__bottom__comment col-12">
            <img
              className="img-circle"
              alt=""
              src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/280374790_1477115089370427_2274356777150785265_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=BGiT7grLdloAX9IRJ_q&_nc_ht=scontent.fdad1-2.fna&oh=00_AT9cSGOCa9XgxlLhOaqjXNYXm19qGb65c2eSuzlvgQuLGQ&oe=63279F08"
            />
            <input placeholder="Viết bình luận..." />
          </div>
          {showComment &&
            listComment.map((comment) => <Comment data={comment} />)}
        </div>
      </div>
      <div className="post-overlay">
        <p className="post-overlay__message">This post is hidden by some reasons.</p>
        <button className="post-overlay__button" onClick={() => setShowHiddenPost(true)}>Click to view.</button>
      </div>
    </div>
  );
}

export default Post;
