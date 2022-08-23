import React, { useState, useEffect } from "react";
import { message } from "antd";
import { connect } from "react-redux";
import { logInUser } from "./../../../redux/actions/index";
import { Row, Col } from "antd";
import "./style/login.css";
import { useTranslation } from "react-i18next";

const Login = (props) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");

  useEffect(() => {
    if (props.message.trim().length !== 0) {
      message.warning(props.message);
    }
  }, [props.message, props.notify]);

  const logUserIn = async (e) => {
    e.preventDefault();
    await props.logInUser(username, password);
  };


  return (
    <Row className="login-page w-100 h-100vh">
      <Col lg={10} md={12}>
        <div className="flex all-center h-100vh loginbackColor">
          <div className="admin-login-box  animated zoomIn  login-page">
            <div className="admin-login-row">
              <h1 className="text-center">Daxil ol</h1>
            </div>
            <form action="" onSubmit={logUserIn}>
              <div className="admin-login-row">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder={t("EMailFull")}
                />
              </div>
              <div className="admin-login-row">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder={t("password")}
                />
              </div>
              {/*<div className={"ml-15 animated fadeIn mt-15"}>*/}
              {/*  <ReCAPTCHA*/}
              {/*    className={"w-100"}*/}
              {/*    sitekey="6LcQk4waAAAAAAxiShlf-3FWHtgKSp13jHfiZj0T"*/}
              {/*    onChange={onChange}*/}
              {/*  />*/}
              {/*</div>*/}
              <div className="admin-login-row">
                <input
                  onClick={logUserIn}
                  type="submit"
                  // disabled={enable === undefined}
                  value={t("login")}
                />
              </div>
            </form>
          </div>
        </div>
      </Col>
      <Col lg={14} md={12} sm={0}>
        <div className="b-100 h-100vh animated fadeIn loginbackground"></div>
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
