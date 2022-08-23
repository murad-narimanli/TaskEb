import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  AuditOutlined,
  HomeOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  CodeSandboxOutlined
} from "@ant-design/icons";
import { logOut } from "../../redux/actions";
import admin from "../../const/api";
import history from "../../const/history";

const MenuList = (props) => {
  return (
    <Menu
      mode="inline"
      theme="light"
      className="menu-ul"
    >
      <Menu.Item key="11">
        <Link to={`/`}>
          <HomeOutlined />
          <span>Admin</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
};


export default connect(null, { logOut })(MenuList);
