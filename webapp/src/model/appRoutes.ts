export function enterPage(url: string) {
  // check if we are not entering the same location
  const l = window.location;
  if (url !== l.href.substring(l.origin.length)) {
    window.history.pushState(null, '', url);
  }
}

interface _Route {
  // The actual route path pattern, eg `/books/:id/`
  route: string;
  // this function constructs url based on given params
  url?: (params?: any) => string;
  // Component initializer. Here, you can initialize the data a page needs to a consistent state.
  // It can be made asynchronously and data fetching can also occur here.
}

export interface Route extends _Route {
  url: (params?: object) => string;
  enter: (params?: any) => void;
}

function mkRoute(r: _Route): Route {
  const r2: Route = r as Route;
  if (r.url === undefined) {
    r2.url = () => r.route;
  }
  r2.enter = (params: any) => enterPage(r2.url(params));
  return r2;
}


const routes = {
  dashboard: mkRoute({route: '/view/dashboard'}),
  deposit: mkRoute({ route: '/view/deposit' }),
  depositNew: mkRoute({ route: '/view/deposit/new' }),
  about: mkRoute({ route: '/view/about' }),
};

export default routes;
