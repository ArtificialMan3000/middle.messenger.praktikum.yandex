// import { isEqual } from '../../utils/isEqual';
import { TComponentPropsType, TConstructor } from '~/src/typings/utils';
import type { Component } from '~/src/view/Component';
import { renderDOM } from '~/src/view/DOM';

// Класс маршрута.
// Хранит маршрут и компонент для отображения.
// Может навигировать по заданному пути, покидать "локацию",
// определять, подходит ли он для определённого пути и отрисовывать компонент.
export class Route<TComponent extends Component> {
  #pathname: string;

  #componentClass: TConstructor<TComponent>;

  #component: Component | null;

  #props: TComponentPropsType<TComponent>;

  #rootElement: HTMLElement;

  constructor(
    pathname: string,
    rootQuery: string,
    view: TConstructor<TComponent>,
    props: TComponentPropsType<TComponent>
  ) {
    this.#pathname = pathname;
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
    if (this.match(pathname)) {
      this.#pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this.#component) {
      this.#component.hide();
    }
  }

  match(pathname: string) {
    return pathname === this.#pathname;
  }

  render() {
    if (!this.#component) {
      this.#component = new this.#componentClass(this.#props);
      renderDOM(this.#rootElement, this.#component);
      return;
    }

    this.#component.show();
  }
}
