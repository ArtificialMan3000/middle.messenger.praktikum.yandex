import { Router } from '../utils/Router';

const ROOT_ELEMENT_QUERY = '#app';

let router: Router;

export function constructRouter() {
  if (!router) {
    router = new Router(ROOT_ELEMENT_QUERY);
  }
  return router;
}

export type { Router };
