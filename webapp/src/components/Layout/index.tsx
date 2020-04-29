import { Layout, PageHeader } from 'antd';
import React from 'react';

export default function(props : React.PropsWithChildren<{title: string}>) {
  return (
    <Layout>
      <Layout key="main">
        <PageHeader key="title" title={props.title} />
        <Layout.Content key="content">
          { props.children }
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
