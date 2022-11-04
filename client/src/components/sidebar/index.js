import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { useState } from "react";
import {
    HomeOutlined,
    CompassOutlined,
    UsergroupAddOutlined,
    BookOutlined,
    HistoryOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./side-bar.scss";

const { Sider } = Layout;
const largeSideBar = 230;
const smallSideBar = 80;

function SideBar() {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider
            width={collapsed ? smallSideBar : largeSideBar}
            collapsible
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}
        >
            <Menu className="side-bar-container">
                <Menu.Item
                    key="1"
                    className="item"
                    icon={<HomeOutlined className="icon" />}
                    onClick={() => navigate("/")}
                >
                    <p>Trang chủ</p>
                </Menu.Item>
                <Menu.Item
                    key="2"
                    className="item"
                    icon={<CompassOutlined className="icon" />}
                >
                    <p>Khám phá</p>
                </Menu.Item>
                <Menu.Item
                    key="3"
                    className="item"
                    icon={<UsergroupAddOutlined className="icon" />}
                    onClick={() => navigate("/friend")}
                >
                    <p>Bạn bè</p>
                </Menu.Item>
                <Menu.Item
                    key="4"
                    className="item"
                    icon={<BookOutlined className="icon" />}
                >
                    <p>Đã lưu</p>
                </Menu.Item>
                <Menu.Item
                    key="5"
                    className="item"
                    icon={<HistoryOutlined className="icon" />}
                >
                    <p>Lịch sử</p>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}
export default SideBar;
