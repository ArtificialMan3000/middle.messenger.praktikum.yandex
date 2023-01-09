import { TClass } from '~/src/typings/utils';
import { Component, TComponentProps } from '~/src/view/Component';
import { Route } from './Route';

// type TClass<TInstance> = typeof TInstance;

export class Router {
  routes: Route<TComponentProps>[];

  defaultRoute: Route<TComponentProps> | null;

  history: History;

  protected _currentRoute: Route<TComponentProps> | null;

  protected _rootQuery: string;

  constructor(rootQuery: string) {
    this.routes = [];
    this.defaultRoute = null;
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
  }

  use<TProps extends TComponentProps>(
    pathname: string,
    componentClass: TClass<Component<TProps>>,
    props: TProps
  ) {
    const route = new Route<TProps>(
      pathname,
      this._rootQuery,
      componentClass,
      props
    );
    this.routes.push(route);
    // Возврат this — основа паттерна "Builder" («Строитель»)
    return this;
  }

  default<TProps extends TComponentProps>(
    componentClass: TClass<Component<TProps>>,
    props: TProps
  ) {
    const route = new Route<TProps>(
      '/*',
      this._rootQuery,
      componentClass,
      props,
      true
    );
    this.defaultRoute = route;
    return this;
  }

  start() {
    // Реагируем на изменения в адресной строке и вызываем перерисовку
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  protected _onRoute(pathname: string) {
    let route = this.getRoute(pathname);
    if (!route) {
      if (this.defaultRoute) {
        route = this.defaultRoute;
      } else {
        return;
      }
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.navigate(pathname);
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  replace(pathname: string) {
    this.history.replaceState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
