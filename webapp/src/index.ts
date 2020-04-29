import './styles/index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import { router } from './model';
import Root from './root';
import * as serviceWorker from './serviceWorker';

const props = { router };

function render(elem: any) {
  ReactDOM.render(
    React.createElement(React.StrictMode, {},
                        React.createElement(elem, props)),
    document.getElementById('root'),
  );
}

render(Root);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
