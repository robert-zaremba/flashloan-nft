import { DownOutlined, WalletOutlined } from '@ant-design/icons';
import {
  Dropdown,
  Layout,
  Menu,
} from 'antd';
import React from 'react';

const menu = (
  <Menu>
    <Menu.Item key="1">Log out</Menu.Item>
  </Menu>
);

export default function () {
  return (
    <Layout.Header className="header">
      <Dropdown overlay={menu} className="user-avatar">
        <span className="ant-dropdown-link">
          <WalletOutlined />
          &nbsp;Wallet&#160;&nbsp;
          <DownOutlined />
        </span>
      </Dropdown>
    </Layout.Header>
  );
}
