// We import pages locally to let webpack split the app code into chunks

import { action, observable } from 'mobx';
import React from 'react';
import { Router } from 'routes';

import Layout from '../components/Layout';
import routes from './appRoutes';
import AppState from './AppState';

const hasWindow = typeof window !== 'undefined';

// ===========================================
// We import pages locally to let webpack split the app code into chunks
//
// Below we declare routes for the https://www.npmjs.com/package/routes router

interface LoadableRoute {
  // The actual route path pattern, eg `/books/:id/`
  route: string;
  // Component initializer. Here, you can initialize the data a page needs to a consistent state.
  // It can be made asynchronously and data fetching can also occur here.
  getComponent: (appState: AppState, params: object) => Promise<JSX.Element>;
  // If declared, onEnter is called after the routing happens. Server-Side-Rendering also
  // waits for this to finish before the route actually changes.
  // This is useful because routes may need data loading logic _after_ they mount.
  onEnter?: (appState: AppState, params: object) => Promise<void>;
}

interface LayoutProps {
  children?: any,
  title: string
}

/* eslint-disable import/no-cycle */

function _getComponent(layout: React.FunctionComponent<any>, page: string,
  props: LayoutProps) {
  return async (_appState: AppState, params: object) => {
    // webpack transpiles strings here. So it's important to use string prefix
    const m = await import(`../pages/${page}`);
    /* eslint no-param-reassign: ["error", { "props": false }] */
    props.children = m.default(params);
    return layout(props) as JSX.Element;
  };
}

const defaultRoute = {
  route: routes.about.route,
  getComponent: _getComponent(Layout, 'About',
    { title: 'Dashboard' }),
};

const loadableRoutes: Array<LoadableRoute> = [{
  route: routes.about.route,
  getComponent: _getComponent(Layout, 'About',
    { title: 'About' }),
}];
// {
//   route: '/users/?:id?',
//   async onEnter(appState, params: { id?: string }) {
//       appState.setMessage('');
//       if (params.id) { // simuate additional fetching that needs to happen after route loads
//           appState.setMessage(`fetching data for user ${params.id}...`);
//           await new Promise((r) => setTimeout(r, 500));
//           appState.setMessage(`data fetched for user ${params.id}`);
//       }
//   },


// This class represents our main react application
export default class App {
  // TODO: use the defaultRoute here
  @observable page: JSX.Element = React.createElement('div', {});

  @observable path = '';

  appState: AppState;

  router: Router<LoadableRoute>;

  pushState: any;

  replaceState: any;

  onpopstate: any;

  constructor(appState: AppState) {
    // we optionally reload the state useful for hot reload and server-side rendering,
    // but also as an extension point for restoring the data from localStorage.
    this.appState = appState;

    this.router = new Router<LoadableRoute>();
    for (const r of loadableRoutes) {
      this.router.addRoute(r.route, r);
    }

    this.hookHistory();
  }

  @action _setPage = (page: JSX.Element) => {
    this.page = page;
  };

  @action async updateLocation(pathname = hasWindow ? window.location.pathname : '/') {
    const match = this.router.match(pathname);
    const params = match ? match.params : {};
    const route = match ? match.fn : defaultRoute;
    if (pathname !== this.path) {
      this.path = pathname;
    }
    const page = await route.getComponent(this.appState, params);
    this._setPage(page);
    if (route.onEnter) {
      await route.onEnter.call(route, this.appState, params);
    }
  }

  hookHistory() {
    // Here we trigger a setup of the start page according to the current url.
    this.updateLocation();

    if (typeof window.history !== 'undefined') {
      this.pushState = window.history.pushState;
      window.history.pushState = (...args) => {
        this.pushState.apply(window.history, args);
        this.updateLocation();
      };

      this.replaceState = window.history.replaceState;
      window.history.replaceState = (...args) => {
        this.replaceState.apply(window.history, args);
        this.updateLocation();
      };

      this.onpopstate = window.onpopstate;
      window.onpopstate = (e: PopStateEvent) => {
        if (this.onpopstate) this.onpopstate.apply(window, e);
        this.updateLocation();
      };
    }
  }

  unload() {
    window.onpopstate = this.onpopstate;
    window.history.pushState = this.pushState;
    window.history.replaceState = this.replaceState;
    this.appState.unload();
  }
}
