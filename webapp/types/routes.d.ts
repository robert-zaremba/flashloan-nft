declare module 'routes' {

  export class Router<T> {
    addRoute(path: string, fn: T)
    removeRoute(path: string)
    match(uri: string, startAt?: number)
  }

  function match(routes: any, uri: any, startAt?: any): any;
  function pathToRegExp(path: any, keys: any): any;
}
