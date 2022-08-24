import React, { useState, useEffect } from "react";
import {message, Checkbox, Form, Input, Button, InputNumber} from "antd";
import { connect } from "react-redux";
import { registerUser } from "./../../../redux/actions/index";
import { Row, Col } from "antd";
import "./style/login.css";
import { useTranslation } from "react-i18next";
import {Link} from "react-router-dom";
import {noWhitespace, whiteSpace} from "../../../utils/rules";


const Register = (props) => {
    useEffect(() => {
        if (props.message.trim().length !== 0) {
            message.warning(props.message);
        }
    }, [props.message, props.notify]);


    const onFinish = (values) => {
        let id = parseInt(Number(Math.random()*Date.now()))
        props.registerUser({
            id,
            ...values,
            isCompany:true,
            companyId:id,
            role: {
                admin: true,
                editTask : true,
                addTask : true,
                deleteTask : true,
                changeStatus : true
            }
        });
    };



    return (
        <Row className="login-page w-100 h-100vh">
            <Col lg={10} md={12}>
                <div className="flex all-center h-100vh loginbackColor">
                    <div className="admin-login-box  animated zoomIn  login-page">
                        <div className="admin-login-row">
                            <h1 className="text-center mb-20">Register</h1>
                        </div>

                        <Form
                            name="basic"
                            layout="vertical"
                            labelCol={{
                                span: 16,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            initialValues={{
                                remember: true,
                            }}

                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Company Name"
                                name="companyName"
                                validateTrigger="onChange"
                                rules={[
                                    whiteSpace('Please input your company name!')
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Company Address"
                                name="address"
                                validateTrigger="onChange"
                                rules={[
                                    whiteSpace('Please input your company address!')
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Username"
                                name="username"
                                validateTrigger="onChange"
                                rules={[whiteSpace('Please input your user name!')]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Phone"
                                name="phone"
                                validateTrigger="onChange"
                                rules={[whiteSpace('Please input your phone number!')]}
                            >
                                <Input type={'number'} />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                validateTrigger="onChange"
                                rules={[
                                    whiteSpace('Please input your email!'),
                                    {
                                        type: "email",
                                        message: "The input is not valid E-mail!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>


                            <Form.Item
                                label="Password"
                                name="password"
                                validateTrigger="onChange"
                                rules={
                                    [
                                        whiteSpace('Please input your password!'),
                                        { min: 6, message: 'Password must be minimum 6 characters.' },
                                    ]
                                }
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Button  size={'large'} type="primary" className={'w-100'}  htmlType="submit">
                                   Register
                                </Button>
                            </Form.Item>
                        </Form>

                        <Link to={'/'}>
                            <Button  size={'large'} className={'w-100'} htmlType="submit">
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </Col>
            <Col lg={14} md={12} sm={0}>
                <div className="b-100 h-100vh animated  loginbackground"></div>
            </Col>
        </Row>
    );
};
const mapStateToProps = ({ user }) => {
    return {
        loggedIn: user.isLoggedIn,
        message: user.message,
        notify: user.notify,
    };
};

export default connect(mapStateToProps, { registerUser })(Register);
