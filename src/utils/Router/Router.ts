import { TClass, TComponentPropsType, TConstructor } from '~/src/typings/utils';
import { Component, TComponentProps } from '~/src/view/Component';
import { Route } from './Route';

// type TClass<TInstance> = typeof TInstance;

export class Router {
  routes: Route<TComponentProps>[];

  defaultRoute: Route<TComponentProps> | null;

  history: History;

  #currentRoute: Route<TComponentProps> | null;

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

  use<TProps extends TComponentProps>(
    pathname: string,
    componentClass: TClass<Component<TProps>>,
    props: TProps
  ) {
    const route = new Route<TProps>(
      pathname,
      this.#rootQuery,
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
      this.#rootQuery,
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
    // route.render();
    route.navigate(pathname);
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
