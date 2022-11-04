import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Post from "../../../components/post";
import FriendTag from "../../../components/friend/tag";
import Posting from "../../../components/posting";
import { listFriendTag } from "../../../utils";
import { useAppContext } from "../../../context/appContext";
import "./home.scss";
function Home() {
    const { listPosts, getAllPosts } = useAppContext();
    useEffect(() => {
        getAllPosts();
    }, []);
    return (
        <div className="home-container">
            <div className="home-container__posts col-6">
                <Posting />
                {listPosts.map((post) => (
                    <Post data={post} />
                ))}
            </div>
            <div className="home-container__list-friend">
                <div className="d-flex my-2">
                    <h5>Bạn bè</h5>
                    <a href="/">Xem tất cả</a>
                </div>
                {listFriendTag.map((item) => (
                    <FriendTag data={item} />
                ))}
            </div>
        </div>
    );
}

export default Home;
