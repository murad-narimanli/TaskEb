import React, { useState, useEffect } from "react";
import { message , Checkbox , Form , Input , Button } from "antd";
import { connect } from "react-redux";
import { logInUser } from "./../../../redux/actions/index";
import { Row, Col } from "antd";
import "./style/login.css";
import { useTranslation } from "react-i18next";
import {Link} from "react-router-dom";


const Login = (props) => {
  const { t } = useTranslation();
  // const [username, setUsername] = useState("eve.holt@reqres.in");
  // const [password, setPassword] = useState("cityslicka");

  useEffect(() => {
    if (props.message.trim().length !== 0) {
      message.warning(props.message);
    }
  }, [props.message, props.notify]);


    const onFinish = (values) => {
        props.logInUser(values.email, values.password);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
    <Row className="login-page w-100 h-100vh">
      <Col lg={10} md={12}>
        <div className="flex all-center h-100vh loginbackColor">
          <div className="admin-login-box  animated zoomIn  login-page">
            <div className="admin-login-row">
              <h1 className="text-center">
                  Log in
              </h1>
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
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
              <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button className={'w-100'} size={'large'} type="primary" htmlType="submit">
                  Log In
                </Button>
              </Form.Item>
            </Form>

              <Link to={'/register'}>
                  <Button className={'w-100'} size={'large'}  htmlType="button">
                        Register
                  </Button>
              </Link>


          </div>
        </div>
      </Col>
      <Col lg={14} md={12} sm={0}>
        <div className="b-100 h-100vh loginbackground"></div>
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

export default connect(mapStateToProps, { logInUser })(Login);
