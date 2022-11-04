import React, { useState } from "react";
import { Modal, Radio, DatePicker, Form, Input } from "antd";
import { CameraFilled } from "@ant-design/icons";
import "./edit-profile.scss";
import { useAppContext } from "../../../context/appContext";

function EditProfile({ isModalOpen, handleOpenModal }) {
    const onSubmit = (values) => {
        updateImage();
    };

    const { updateAvatar, user } = useAppContext();

    const [selectedImage, setSelectedImage] = useState();

    const handleUploadImage = (e) => {
        const userAvatar = document.getElementById("user-avatar");
        userAvatar.src = URL.createObjectURL(e.target.files[0]);
        setSelectedImage(e.target.files[0]);
    };

    const updateImage = () => {
        const formData = new FormData();
        if(selectedImage) {
            formData.append("image", selectedImage);
            updateAvatar(formData);
        }
    };

    return (
        <Modal
            className="edit-profile"
            open={isModalOpen}
            footer={null}
            onOk={() => handleOpenModal(false)}
            onCancel={() => handleOpenModal(false)}
        >
            <div className="edit-profile__avatar">
                <img
                    id="user-avatar"
                    src={user.avatar}
                    alt=""
                />
                <label for="image-input">
                    <CameraFilled className="edit-profile__avatar__icon-camera" />
                </label>
                <input
                    id="image-input"
                    style={{ display: "none" }}
                    accept="image/png, image/jpeg"
                    type="file"
                    onChange={handleUploadImage}
                />
            </div>
            <Form className="edit-profile__content" onFinish={onSubmit}>
                <div className="edit-profile__content__item">
                    <lable className="col-3">Họ và tên</lable>
                    <div className="col-1"></div>
                    <Form.Item name="name" className="col-8 mb-0">
                        <Input defaultValue="Hieu" />
                    </Form.Item>
                </div>
                <div className="edit-profile__content__item">
                    <lable className="col-3">Giới tính</lable>
                    <div className="col-1"></div>
                    <Form.Item name="gender" className="col-8 mb-0">
                        <Radio.Group defaultValue={true}>
                            <Radio value={true}>Nữ</Radio>
                            <Radio value={false}>Nam</Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>
                <div className="edit-profile__content__item">
                    <lable className="col-3">Ngày sinh</lable>
                    <div className="col-1"></div>
                    <Form.Item name="birthday" className="col-8 mb-0">
                        <DatePicker className="col-12" />
                    </Form.Item>
                </div>
                <div className="edit-profile__content__item">
                    <lable className="col-3">Địa chỉ</lable>
                    <div className="col-1"></div>
                    <Form.Item name="address" className="col-8 mb-0">
                        <Input defaultValue="Hue" />
                    </Form.Item>
                </div>
                <div className="edit-profile__content__item">
                    <lable className="col-3">Số điện thoại</lable>
                    <div className="col-1"></div>
                    <Form.Item name="phone_number" className="col-8 mb-0">
                        <Input defaultValue="0394285138" />
                    </Form.Item>
                </div>
                <div className="edit-profile__content__item">
                    <lable className="col-3">Sở thích</lable>
                    <div className="col-1"></div>
                    <Form.Item name="hobbies" className="col-8 mb-0">
                        <Input defaultValue="ngu" />
                    </Form.Item>
                </div>
                <div className="edit-profile__content__footer">
                    <button
                        type="button"
                        onClick={() => handleOpenModal(false)}
                    >
                        Thoát
                    </button>
                    <button
                        type="primary"
                        htmlType="submit"
                        className="btn-blue"
                    >
                        Lưu
                    </button>
                </div>
            </Form>
        </Modal>
    );
}

export default EditProfile;
