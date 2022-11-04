import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { messages } from "../../../assets/lang/messages";
import "./register.scss";
import { useAppContext } from "../../../context/appContext";
import Alert from "../../../components/alert";

function Register() {
    const [inputEmailState, setInputEmailState] = useState(false);
    const [inputUsernameState, setInputUsernameState] = useState(false);
    const [inputPasswordState, setInputPasswordState] = useState(false);
    const [inputPasswordConfirmState, setInputPasswordConfirmState] =
        useState(false);

    const { isLoading, showAlert, registerUser } = useAppContext();

    const onFinish = (values) => {
        const { email, username, password } = values;
        const currentUser = { email, username, password };
        registerUser({
            currentUser,
            alertText: "User Created! Redirecting...",
        });
    };

    return (
        <div className="register-container">
            <div className="register-container__content">
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
                                    ? "register-container__content__item active"
                                    : "register-container__content__item"
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
                                inputUsernameState
                                    ? "register-container__content__item active"
                                    : "register-container__content__item"
                            }
                        >
                            <UserOutlined className="icon" />
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: messages["text_required"],
                                    },
                                ]}
                            >
                                <Input
                                    className="input"
                                    placeholder="Username"
                                    onFocus={() => setInputUsernameState(true)}
                                    onBlur={() => setInputUsernameState(false)}
                                />
                            </Form.Item>
                        </div>
                        <div
                            className={
                                inputPasswordState
                                    ? "register-container__content__item active"
                                    : "register-container__content__item"
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
                        <div
                            className={
                                inputPasswordConfirmState
                                    ? "register-container__content__item active"
                                    : "register-container__content__item"
                            }
                        >
                            <LockOutlined className="icon" />
                            <Form.Item
                                name="comfirm-password"
                                dependencies={["password"]}
                                rules={[
                                    {
                                        required: true,
                                        message: messages["text_required"],
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (
                                                !value ||
                                                getFieldValue("password") ===
                                                    value
                                            ) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error(
                                                    messages[
                                                        "confirm_password_not_match"
                                                    ]
                                                )
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    className="input"
                                    placeholder="Confirm password"
                                    onFocus={() =>
                                        setInputPasswordConfirmState(true)
                                    }
                                    onBlur={() =>
                                        setInputPasswordConfirmState(false)
                                    }
                                />
                            </Form.Item>
                        </div>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="btn-submit mt-4 mb-3"
                                disabled={isLoading}
                            >
                                REGISTER
                            </Button>
                        </Form.Item>
                        <a href="/login" className="text-center ">
                            Already have an account? Login
                        </a>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Register;
