import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import ChangePassword from "../modal/change-password";
import { Menu, Dropdown } from "antd";
import {
    SearchOutlined,
    MessageOutlined,
    BellOutlined,
    UserOutlined,
    LockOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import "./header.scss";

function Header() {
    const navigate = useNavigate();
    const { logoutUser, user } = useAppContext();
    const [isModalOpen, setisModalOpen] = useState(false);
    const handleOpenModal = (state) => {
        setisModalOpen(state);
    };
    const handleLogout = () => {
        logoutUser();
        navigate("/login");
    };
    const menu = () => {
        return (
            <Menu class="header-menu">
                <Menu.Item key="1" className="header-menu__item">
                    <a href="/profile" className="tag-a">
                        <UserOutlined className="icon" />
                        <span>Thông tin cá nhân</span>
                    </a>
                </Menu.Item>
                <Menu.Item key="2" className="header-menu__item">
                    <LockOutlined className="icon" />
                    <span onClick={() => handleOpenModal(true)}>
                        Đổi mật khẩu
                    </span>
                    <ChangePassword
                        isModalOpen={isModalOpen}
                        handleOpenModal={handleOpenModal}
                    />
                </Menu.Item>
                <Menu.Item
                    key="3"
                    onClick={handleLogout}
                    className="header-menu__item"
                >
                    <LogoutOutlined className="icon" />
                    <span>Đăng xuất</span>
                </Menu.Item>
            </Menu>
        );
    };

    return (
        <div className="header-container">
            <h2 className="col-3">
                <a href="/">KuruKu</a>
            </h2>
            <div className="header-container__center col-5">
                <SearchOutlined />
                <input type="text" placeholder="Tìm kiếm" />
            </div>
            <div className="header-container__right col-4">
                <div className="header-container__right__item">
                    <MessageOutlined className="header-container__right__item__icon" />
                    <div className="header-container__right__item__notification">
                        <div className="position-relative">
                            <span>1</span>
                        </div>
                    </div>
                </div>
                <div className="header-container__right__item">
                    <BellOutlined className="header-container__right__item__icon" />
                    <div className="header-container__right__item__notification">
                        <div className="position-relative">
                            <span>12</span>
                        </div>
                    </div>
                </div>
                <Dropdown overlay={menu} trigger={["click"]}>
                    <div className="avatar">
                        <img src={user.avatar} alt="" />
                    </div>
                </Dropdown>
            </div>
        </div>
    );
}
export default Header;
