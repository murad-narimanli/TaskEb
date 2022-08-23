import React from "react";
import {
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import logo from "./../../../assets/img/logon.png";
import { Button, Popover, Tooltip, Avatar, Row, Col } from "antd";
import { logOut } from "../../../redux/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import history from "../../../const/history";
import { useTranslation } from "react-i18next";

const TopMenu = (props) => {
  const { t } = useTranslation();
  const logOut = () => {
    localStorage.removeItem("access_token");
    props.logOut();
    history.push("/");
  };

  const content = () => {
    return (
      <div className="profil-info">
        <Row className="border-bottom flex-align-center pt-1 pb-1 mb-10">
          <Col xs={4}>
            <Avatar size={38} src={props.user.avatar} />
          </Col>
          <Col className="border-right" xs={20}>
            <div className="flex dir-column w-100 h-100 justify-center pr-1">
              <h3>{props.user.first_name + ' ' + props.user.last_name }</h3>
              <p>{props.user.email}</p>
            </div>
          </Col>
        </Row>
        <div className="w-100  flex flex-end">
          <Button onClick={logOut}>
            <span>{t("logOut")}</span> <LogoutOutlined />
          </Button>
        </div>
      </div>
    );
  };

    return (
    <div className="position-relative">
      <div className="top-menu flex-align-center flex animated slideInDown ">
        {props.showDrawerButton ? (
          <Button type="primary" className="mr-20" onClick={props.toggleDrawer}>
            {props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        ) : null}
        {props.collapsed ? (
          <Link to="/">
            <img className="animated fadeIn" src={logo} alt="" />
          </Link>
        ) : null}
        <div className="top-menu-navigation">
          <Tooltip placement="bottomRight" title={props.user.first_name}>
            <Popover
              className="ml-20"
              placement="bottomRight"
              content={content()}
              trigger="click"
            >
              <Avatar src={props?.user?.avatar} size={35} />
            </Popover>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    user: user.data,
  };
};
export default connect(mapStateToProps, { logOut })(TopMenu);
