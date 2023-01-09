import { store, StoreEvents } from '../store';
import { TClass } from '../typings/utils';
import { isDefined } from '../utils/functions';
import { Router } from '../utils/Router';
import { Route } from '../utils/Router/Route';
import type { Component, TComponentProps } from '../view/Component';

export enum RouteTypes {
  COMMON = 'common',
  GUEST = 'guest',
  PRIVATE = 'private',
}

export enum RouterStatus {
  GUEST = 'guest',
  PRIVATE = 'private',
}

type RouteWithType<TProps extends TComponentProps> = Route<TProps> & {
  type: RouteTypes;
};

class RouterManagement extends Router {
  static ROOT_ELEMENT_QUERY = '#app';

  routes: RouteWithType<TComponentProps>[];

  defaultRoute: RouteWithType<TComponentProps> | null;

  defaultGuestPathname: string;

  defaultPrivatePathname: string;

  protected _currentRoute: RouteWithType<TComponentProps> | null;

  #status: RouterStatus;

  constructor() {
    super(RouterManagement.ROOT_ELEMENT_QUERY);
    // this.#status = RouterStatus.GUEST;
  }

  use<TProps extends TComponentProps>(
    pathname: string,
    componentClass: TClass<Component<TProps>>,
    props: TProps,
    type = RouteTypes.COMMON,
    isDefaultForType = false
  ) {
    // debugger;
    const route = new Route<TProps>(
      pathname,
      this._rootQuery,
      componentClass,
      props
    ) as RouteWithType<TProps>;

    route.type = type;

    this.routes.push(route);

    if (isDefaultForType) {
      if (type === RouteTypes.GUEST) {
        this.defaultGuestPathname = pathname;
      }

      if (type === RouteTypes.PRIVATE) {
        this.defaultPrivatePathname = pathname;
      }
    }

    return this;
  }

  default<TProps extends TComponentProps>(
    componentClass: TClass<Component<TProps>>,
    props: TProps
  ) {
    super.default(componentClass, props);

    if (this.defaultRoute) {
      this.defaultRoute.type = RouteTypes.COMMON;
    }

    return this;
  }

  _onRoute(pathname: string) {
    // console.log('inherit routes', this.routes);

    super._onRoute(pathname);
    this.statusRedirect();
  }

  setStatus(status: RouterStatus) {
    this.#status = status;
    this.statusRedirect();
  }

  isNeedPrivateRedirect() {
    return (
      this.#status === RouterStatus.PRIVATE &&
      this._currentRoute?.type === RouteTypes.GUEST
    );
  }

  isNeedGuestRedirect() {
    return (
      this.#status === RouterStatus.GUEST &&
      this._currentRoute?.type === RouteTypes.PRIVATE
    );
  }

  statusRedirect() {
    // debugger;
    if (this.isNeedGuestRedirect()) {
      this.replace(this.defaultGuestPathname);
    }

    if (this.isNeedPrivateRedirect()) {
      this.replace(this.defaultPrivatePathname);
    }
  }
}

const router = new RouterManagement();

function setActualStatus(isPrivate: boolean) {
  console.log('redirect', isPrivate);

  if (isPrivate) {
    router.setStatus(RouterStatus.PRIVATE);
  }
  if (!isPrivate) {
    router.setStatus(RouterStatus.GUEST);
  }
}

function connectRouterToStore() {
  let { isLoading, isPrivate } = store.getState().app || {};

  if (isDefined(isPrivate) && !isLoading) {
    setActualStatus(isPrivate);
  }

  store.on(StoreEvents.Updated, () => {
    const { isLoading: isLoadingNew, isPrivate: isPrivateNew } =
      store.getState().app || {};

    if (isPrivate !== isPrivateNew || isLoading !== isLoadingNew) {
      if (isDefined(isPrivateNew) && !isLoadingNew) {
        setActualStatus(isPrivateNew);
      }
    }

    isLoading = isLoadingNew;
    isPrivate = isPrivateNew;
  });
}

connectRouterToStore();

export default router;
export type { RouterManagement };
