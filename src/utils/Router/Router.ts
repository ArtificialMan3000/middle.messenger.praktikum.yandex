import { TComponentPropsType, TConstructor } from '~/src/typings/utils';
import { Component } from '~/src/view/Component';
import { Route } from './Route';

class Router {
  routes: Route<Component>[];

  defaultRoute: Route<Component> | null;

  history: History;

  #currentRoute: Route<Component> | null;

  #rootQuery: string;

  constructor(rootQuery: string) {
    // if (Router.__instance) {
    //   return Router.__instance;
    // }

    this.routes = [];
    this.defaultRoute = null;
    this.history = window.history;
    this.#currentRoute = null;
    this.#rootQuery = rootQuery;

    // Router.__instance = this;
  }

  use<TComponent extends Component>(
    pathname: string,
    component: TConstructor<TComponent>,
    props: TComponentPropsType<TComponent>
  ) {
    const route = new Route<TComponent>(
      pathname,
      this.#rootQuery,
      component,
      props
    );
    this.routes.push(route);
    // Возврат this — основа паттерна "Builder" («Строитель»)
    return this;
  }

  default<TComponent extends Component>(
    component: TConstructor<TComponent>,
    props: TComponentPropsType<TComponent>
  ) {
    const route = new Route<TComponent>('', this.#rootQuery, component, props);
    this.defaultRoute = route;
    return this;
  }

  start() {
    // Реагируем на изменения в адресной строке и вызываем перерисовку
    window.onpopstate = () => {
      this.#onRoute(window.location.pathname);
    };

    this.#onRoute(window.location.pathname);
  }

  #onRoute(pathname: string) {
    let route = this.getRoute(pathname);
    if (!route) {
      if (this.defaultRoute) {
        route = this.defaultRoute;
      } else {
        return;
      }
    }

    if (this.#currentRoute) {
      this.#currentRoute.leave();
    }

    this.#currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this.#onRoute(pathname);
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

let router: Router;

export const getRouter = (rootQuery?: string) => {
  if (!router) {
    if (!rootQuery) {
      return null;
    }
    router = new Router(rootQuery);
  }
  return router;
};
