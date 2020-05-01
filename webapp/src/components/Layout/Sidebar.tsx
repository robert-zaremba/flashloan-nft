import {
  DownOutlined,
  WalletFilled,
} from '@ant-design/icons';
import {
  Button, Layout, Menu,
} from 'antd';
import React from 'react';

import routes from '../../model/appRoutes';
import Link from '../Link';

const sampleWalletID: string = '0x1f5D3AC...';

export default function Sidebar() {
  return (
    <Layout.Sider
      id="main-menu"
      breakpoint="lg"
      collapsedWidth="0"
      width={330}
    >
      <div style={{ textAlign: 'center', width: '100%', padding: '16px' }}>
        <Button type="primary" shape="round" icon={<WalletFilled />} size="large">
          {sampleWalletID}
          {' '}
          <DownOutlined />
        </Button>
      </div>

      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['1']}
      >
        <Menu.Item key="1"><Link href={routes.dashboard.url()}>Dashboard</Link></Menu.Item>
        <Menu.Item key="2"><Link href={routes.deposit.url()}>Deposit</Link></Menu.Item>
        <Menu.Item key="3"><Link href={routes.about.url()}>About</Link></Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}
