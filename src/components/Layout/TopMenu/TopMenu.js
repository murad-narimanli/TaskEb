import React from "react";
import {
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined, SettingOutlined,
} from "@ant-design/icons";
import logo from "./../../../assets/img/logon.png";
import { Button, Popover, Tooltip, Avatar, Row, Col } from "antd";
import { logOut } from "../../../redux/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import history from "../../../const/history";
import { useTranslation } from "react-i18next";
import Permission from "../../Elements/Permission";

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
            <Avatar style={{ backgroundColor: 'rgba(118,188,33,0.81)' }} size={38} >{props.user.username[0].toUpperCase()}</Avatar>
          </Col>
          <Col className="border-right" xs={20}>
            <div className="flex dir-column w-100 h-100 justify-center pr-1">
              <h3>{props.user.companyName + ' - ' + props.user.username }</h3>
              <p>Email: {props.user.email}</p>
              <p>Role: {props.user.role.admin ? 'Admin' : 'User'}</p>
            </div>
          </Col>
        </Row>
        <div className="w-100  flex flex-between">
          <Link to={'/user-settings'}>
            <Button>
              <SettingOutlined />
              <span>{t("settings")}</span>
            </Button>
          </Link>
          <Button onClick={logOut}>
            <LogoutOutlined />
            <span>{t("logOut")}</span>
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
          <Tooltip placement="bottomRight" title={props.user.username}>
            <Popover
              className="ml-20 flex flex-align-center"
              placement="bottomRight"
              content={content()}
              trigger="click"
            >
              <div className={'mr-20 text-left'}>
                <Permission type={'admin'} isOk={false}>
                  <div>
                    {props.user.name} {props.user.surname}
                  </div>
                </Permission>

                <Permission type={'admin'}>
                  <div>
                    {props.user.companyName}
                  </div>
                </Permission>

              </div>
              <Avatar style={{ backgroundColor: 'rgba(118,188,33,0.81)' }} gap={'A'} size={35} >{props.user.username[0].toUpperCase()}</Avatar>
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
