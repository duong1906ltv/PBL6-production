import React from "react";
import { useAppContext } from "../../context/appContext";
import "./info.scss";

function Info() {
    const { userProfile} = useAppContext();
    return (
        <div className="info-container">
            <div className="d-flex my-4">
                <img src={require("../../assets/images/gender.png")} alt=""/>
                <div className="ms-4">
                    <p>{userProfile.gender}</p>
                    <span className="text">Giới tính</span>
                </div>
            </div>
            <div className="d-flex my-4">
                <img src={require("../../assets/images/birthday.png")} alt=""/>
                <div className="ms-4">
                    <p>{userProfile.birthday}</p>
                    <span className="text">Ngày sinh</span>
                </div>
            </div>
            <div className="d-flex my-4">
                <img src={require("../../assets/images/location.png")} alt=""/>
                <div className="ms-4">
                    <p>{userProfile.address}</p>
                    <span className="text">Nơi sống</span>
                </div>
            </div>
            <div className="d-flex my-4">
                <img src={require("../../assets/images/email.png")} alt="" />
                <div className="ms-4">
                    <p>{userProfile.user.email}</p>
                    <span className="text">Email</span>
                </div>
            </div>
            <div className="d-flex my-4">
                <img src={require("../../assets/images/phone.png")} alt="" />
                <div className="ms-4">
                    <p>{userProfile.phoneNumber}</p>
                    <span className="text">Số điện thoại</span>
                </div>
            </div>
            <div className="d-flex my-4">
                <img src={require("../../assets/images/love.png")} alt="" />
                <div className="ms-4">
                    <p>{userProfile.hobby}</p>
                    <span className="text">Sở thích</span>
                </div>
            </div>
        </div>
    );
}

export default Info;
