import { configure } from 'mobx';

import AppRouter from './AppRouter';
import AppState from './AppState';

configure({
  enforceActions: 'observed',
});

/*
const url = process.env.REACT_APP_API_URL;
if (!url) {
  throw Error('REACT_APP_API_URL env variable must be defined');
}

// client Graphql / urql client here
export const client = createClient({
  url,
});
*/

const appState = new AppState();
export const router = new AppRouter(appState);
export default appState;
