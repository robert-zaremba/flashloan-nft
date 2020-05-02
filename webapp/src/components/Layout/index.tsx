import { Layout, PageHeader } from 'antd';
import React from 'react';

import Footer from './Footer';
import Sider from './Sidebar';

function DefaultLayout(props : React.PropsWithChildren<{title: string}>) {
  return (
    <Layout>
      <Sider key="sider" />
      <Layout key="main">
        <Layout.Header key="header">
          <PageHeader
            className="site-page-header"
            title="NFT Flashloans"
          />
        </Layout.Header>
        <Layout.Content key="content">
          {props.title}
          {props.children}
        </Layout.Content>
        <Footer key="footer" />
      </Layout>
    </Layout>
  );
}

export default DefaultLayout;
