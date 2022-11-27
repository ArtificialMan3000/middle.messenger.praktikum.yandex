// import { isEqual } from '../../utils/isEqual';
import { TComponentPropsType, TConstructor } from '~/src/typings/utils';
import type { Component } from '~/src/view/Component';
import { renderDOM } from '~/src/view/DOM';
import { THydratedParams, TParsedTemplate, TParts } from './types';

type TPathTemplate = string;
// Класс маршрута.
// Хранит маршрут и компонент для отображения.
// Может навигировать по заданному пути, покидать "локацию",
// определять, подходит ли он для определённого пути и отрисовывать компонент.
export class Route<TComponent extends Component> {
  static TEMPLATE_REGEXP = /^(?:\/:?[*-.\w]+)*\/?$/;

  static PATHNAME_REGEXP = /^(?:\/[*-.\w]+)*\/?$/;

  #pathTemplate: TPathTemplate;

  #parsedTemplate: TParsedTemplate;

  isMatchAll: boolean;

  #componentClass: TConstructor<TComponent>;

  #component: Component | null;

  #props: TComponentPropsType<TComponent>;

  #rootElement: HTMLElement;

  constructor(
    pathTemplate: string,
    rootQuery: string,
    view: TConstructor<TComponent>,
    props: TComponentPropsType<TComponent>,
    isMatchAll = false
  ) {
    if (!this.#validateTemplate(pathTemplate)) {
      throw new Error('Not valid path template');
    }
    this.#pathTemplate = pathTemplate;
    this.#parsedTemplate = this.#parseTemplate(this.#pathTemplate);
    this.isMatchAll = isMatchAll;
    this.#componentClass = view;
    this.#component = null;
    this.#props = props;
    const rootElement = document.querySelector<HTMLElement>(rootQuery);
    if (!rootElement) {
      throw new Error('Can not find element by received query');
    }
    this.#rootElement = rootElement;
  }

  navigate(pathname: string) {
    if (this.#validatePathname(pathname)) {
      if (this.match(pathname)) {
        const params = this.#extractParams(pathname);
        this.render(params);
      }
    }
  }

  leave() {
    if (this.#component) {
      this.#component.hide();
    }
  }

  match(pathname: string) {
    if (this.isMatchAll) {
      return true;
    }
    if (this.#validatePathname(pathname)) {
      const parts = this.#extractParts(pathname);
      return parts.length >= this.#parsedTemplate.length && parts.every((part, index) => {
        if (typeof this.#parsedTemplate[index] === 'object') {
          return true;
        }
        if (typeof this.#parsedTemplate[index] === 'string') {
          return (
            part === this.#parsedTemplate[index] ||
            this.#parsedTemplate[index] === '*'
          );
        }
        return false;
      });
    }
    return false;
  }

  render(params?: Record<string, string>) {
    if (!this.#component) {
      this.#component = new this.#componentClass({ ...this.#props, ...params });
      renderDOM(this.#rootElement, this.#component);
      return;
    }

    this.#component.show();
  }

  // Pathname must be like '/path/to/:param1/:param2/further'
  #validateTemplate(pathTemplate: string) {
    return Route.TEMPLATE_REGEXP.test(pathTemplate);
  }

  #validatePathname(pathname: string) {
    return Route.PATHNAME_REGEXP.test(pathname);
  }

  #parseTemplate(pathTemplate: string) {
    const parts = this.#extractParts(pathTemplate);

    const parsed: TParsedTemplate = parts.map((part) => {
      if (part[0] === ':') {
        return { param: part.slice(1) };
      }
      return part;
    });

    return parsed;
  }

  #extractParams(pathname: string) {
    const pathParts = this.#extractParts(pathname);

    const params: THydratedParams = {};

    this.#parsedTemplate.forEach((templatePart, index) => {
      if (typeof templatePart !== 'string') {
        params[templatePart.param] = pathParts[index];
      }
    });
    return params;
  }

  #extractParts(validatedPath: string): TParts {
    return validatedPath.split('/').filter((part) => part !== '');
  }

  // #parsePath(pathname: string) {
  //   const parts = pathname.split('/');
  //   this.#parsedTemplate.forEach((templatePart, index)=>{
  //     if (typeof templatePart !== 'string') {
  //       return templatePart;
  //     }
  //     return {name: templatePart.param, value: }
  //   })
  // }
}
