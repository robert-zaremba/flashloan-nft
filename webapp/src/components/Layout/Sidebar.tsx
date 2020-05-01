import {
  HomeOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';

import routes from '../../model/appRoutes';
import Link from '../Link';

export default function Sidebar() {
  return (
    <Layout.Sider
      id="main-menu"
      breakpoint="lg"
      collapsedWidth="0"
      width={330}
    >
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
      >
        <Menu.SubMenu
          key="sub1"
          title={(
            <>
              <HomeOutlined />
                      {' '}
                NFT Flash Loans
                    </>
            )}
        >
          <Menu.Item key="1"><Link href={routes.dashboard.url()}>Dashboard</Link></Menu.Item>
          <Menu.Item key="2"><Link href={routes.deposit.url()}>Deposit</Link></Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="3"><Link href={routes.about.url()}>About</Link></Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}
