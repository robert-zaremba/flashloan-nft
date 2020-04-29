import React from 'react';
import ReactDOM from 'react-dom';

import { router } from './model';
import Root from './root';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(React.createElement(Root, { router }), div);
  ReactDOM.unmountComponentAtNode(div);
});
