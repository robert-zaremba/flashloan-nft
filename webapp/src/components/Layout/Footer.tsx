import { Layout } from 'antd';
import React from 'react';

const { Footer } = Layout;

function LayoutFooter() {
  const y = new Date().getFullYear();
  return (
    <Footer>
Copyright &#169;
      {y}
. All rights reserved.
    </Footer>
  );
}

export default LayoutFooter;
