import * as React from 'react';

import { enterPage } from '../model/appRoutes';

function pushState(url: string) {
  return (e: React.MouseEvent<any>) => {
    e.preventDefault();
    enterPage(url);
  };
}

interface Props extends React.AnchorHTMLAttributes<null> {
  href: string,
  children: React.ReactNode
}

function Link({ children, ...rest }: Props) {
  const props = { ...rest, onClick: pushState(rest.href) };
  return React.createElement('a', props, children);
}

export default Link;
