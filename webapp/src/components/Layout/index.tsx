import { Layout, PageHeader } from 'antd';
import React from 'react';

import Footer from './Footer';
import Header from './Header';
import Sider from './Sidebar';

function DefaultLayout(props : React.PropsWithChildren<{title: string}>) {
  return (
    <Layout>
      <Sider key="sider" />
      <Layout key="main">
        <Header key="header" />
        <PageHeader key="title" title={props.title} />
        <Layout.Content key="content">
          { props.children }
        </Layout.Content>
        <Footer key="footer" />
      </Layout>
    </Layout>
  );
}

export default DefaultLayout;
