import React, { useState } from "react";
import { Input, Form } from "antd";
import { useAppContext } from "../../context/appContext"
import "./posting.scss";

const { TextArea } = Input;
function Posting() {
    const [images, setImages] = useState([]);
    const { createPost, user } = useAppContext();

    const handleUploadImage = (e) => {
        var listsImage = images.slice();
        listsImage.push(URL.createObjectURL(e.target.files[0]));
        setImages(listsImage);
    };
    const handleSubmit = (values) => {
        const text = values.text
        createPost({ text});
        setTimeout(() => {
            window.location.reload(false)
        }, 1000);
    };
    return (
        <Form className="posting-container" onFinish={handleSubmit}>
            <div className="posting-container__top">
                <img
                    src={user.avatar}
                    alt=""
                />
                <Form.Item name="text" className="col-11">
                    <TextArea
                        placeholder="Bạn đang nghĩ gì ?"
                        name="text"
                        autoSize={{ minRows: 1, maxRows: 15 }}
                    />
                </Form.Item>
            </div>
            <div
                className={
                    images.length !== 0
                        ? "posting-container__list-image"
                        : ""
                }
            >
                {images.map((image) => (
                    <img className="image" src={image} alt="" />
                ))}
            </div>

            <div className="posting-container__bottom">
                <div className="item col-4">
                    <img
                        src={require("../../assets/images/icon-emoji.png")}
                        alt=""
                    />
                    Cảm xúc
                </div>
                <label className="item col-4" for="image-input">
                    <img
                        src={require("../../assets/images/icon-image.png")}
                        alt=""
                    />
                    Ảnh/Video
                </label>
                <input
                    id="image-input"
                    style={{ display: "none" }}
                    accept="image/png, image/jpeg"
                    type="file"
                    onChange={handleUploadImage}
                />
                <div className="item col-4">
                    <img
                        src={require("../../assets/images/icon-gif.png")}
                        alt=""
                    />
                    Gif
                </div>
            </div>
            <button type="submit" className="btn-blue">
                Đăng bài
            </button>
        </Form>
    );
}
export default Posting;
