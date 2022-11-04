import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { messages } from "../../../assets/lang/messages";
import "./login.scss";
import { useAppContext } from "../../../context/appContext";
import Alert from "../../../components/alert";

function Login() {
    const [inputEmailState, setInputEmailState] = useState(false);
    const [inputPasswordState, setInputPasswordState] = useState(false);
    const { isLoading, showAlert, loginUser } = useAppContext();

    const onFinish = (values) => {
        const { email, password } = values;
        const currentUser = { email, password };
        loginUser({
            currentUser,
            alertText: "Login Successful! Redirecting...",
        });
    };

    return (
        <div className="login-container">
            <div className="login-container__content">
                <div className="col-6">
                    <img
                        src={require("../../../assets/images/Account-amico.png")}
                        alt=""
                    />
                </div>
                <div className="d-flex flex-column align-items-center col-6">
                    <h1>WELCOME</h1>
                    <Form
                        className="d-flex flex-column col-7 mt-5"
                        onFinish={onFinish}
                    >
                        {showAlert && <Alert />}

                        <div
                            className={
                                inputEmailState
                                    ? "login-container__content__item active"
                                    : "login-container__content__item"
                            }
                        >
                            <MailOutlined className="icon" />
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: messages["text_required"],
                                    },
                                    {
                                        type: "email",
                                        message: messages["invalid_email"],
                                    },
                                ]}
                            >
                                <Input
                                    className="input"
                                    placeholder="Email"
                                    onFocus={() => setInputEmailState(true)}
                                    onBlur={() => setInputEmailState(false)}
                                />
                            </Form.Item>
                        </div>
                        <div
                            className={
                                inputPasswordState
                                    ? "login-container__content__item active"
                                    : "login-container__content__item"
                            }
                        >
                            <LockOutlined className="icon" />
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: messages["text_required"],
                                    },
                                    {
                                        type: "string",
                                        min: 6,
                                        max: 24,
                                        message:
                                            messages["invalid_password_length"],
                                    },
                                ]}
                            >
                                <Input.Password
                                    className="input"
                                    placeholder="Password"
                                    onFocus={() => setInputPasswordState(true)}
                                    onBlur={() => setInputPasswordState(false)}
                                />
                            </Form.Item>
                        </div>
                        <label className="mt-3">Forgot your password?</label>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="btn-submit my-3"
                                disabled={isLoading}
                            >
                                LOGIN
                            </Button>
                        </Form.Item>
                        <a href="/register" className="text-center ">
                            Create new account
                        </a>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;
