import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  OrderedListOutlined,
  AreaChartOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  UnorderedListOutlined
} from "@ant-design/icons";
import Permission from "./Permission";

const MenuList = (props) => {
  return (
    <Menu
      mode="inline"
      theme="light"
      className="menu-ul"
      defaultSelectedKeys={'3'}
    >
      {/*<Menu.Item key="/">*/}
      {/*  <Link to={`/`}>*/}
      {/*    <AreaChartOutlined />*/}
      {/*    <span>Dashboard</span>*/}
      {/*  </Link>*/}
      {/*</Menu.Item>*/}

      <Menu.Item key="3">
        <Link to={`/tasks`}>
          <OrderedListOutlined />
          <span>Tasks</span>
        </Link>
      </Menu.Item>

      <Permission type={'admin'}>
        <Menu.Item key="4">
          <Link to={`/users`}>
              <div style={{paddingLeft: !props.collapsed ? '24px' : '0'}}>
                <UsergroupAddOutlined />
                <span>Users </span>
              </div>
          </Link>
        </Menu.Item>
      </Permission>


      <Menu.Item key="5">
        <Link to={`/user-settings`}>
          <SettingOutlined />
          <span>User Settings</span>
        </Link>
      </Menu.Item>

    </Menu>
  );
};


export default MenuList
