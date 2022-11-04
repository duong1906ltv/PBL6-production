import React from "react";
import Header from "../header";
import SideBar from "../sidebar";
import "./main-layout.scss";

function MainLayout(props) {
    return (
        <div className="main-layout-container d-flex flex-column">
            <Header/>
            <div className="main-layout-content">
                <SideBar/>
                <div className="main-layout-content__main">
                    <props.component/>
                </div>
            </div>
        </div>
    );
}
export default MainLayout;
