import { v4 as uuid } from 'uuid';
import { TemplateDelegate } from 'handlebars';
import {
  TEventsMap,
  TComponentProps,
  TComponentMeta,
  TComponentChildren,
} from './types';
import { EventBus } from '../../controller/EventBus/EventBus';

export class Component<TProps extends TComponentProps = TComponentProps> {
  static EVENTS: Record<string, string> = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  #element: HTMLElement;

  #meta: TComponentMeta;

  #DOMEvents: TEventsMap;

  props: TProps;

  children: TComponentChildren;

  eventBus: EventBus;

  #uuid: string;

  innerComponents: Record<string, Component | Component[]>;

  constructor(props: TProps, tagName = 'div') {
    this.eventBus = new EventBus();

    this.#meta = {
      tagName,
      props,
    };

    this.#uuid = uuid();

    this.#DOMEvents = {};

    this.props = this.#makePropsProxy({
      ...props,
      __id: this.#uuid,
    });

    this.#registerEvents(this.eventBus);
    this.eventBus.emit(Component.EVENTS.INIT);
  }

  get element() {
    return this.#element;
  }

  getContent() {
    return this.element;
  }

  #registerEvents(eventBus: EventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this.#componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this.#componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this.#render.bind(this));
  }

  // * Lifecycle handlers

  init() {
    this.#createResources();
    this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
  }

  #componentDidMount() {
    this.componentDidMount(this.props);

    if (this.innerComponents) {
      Object.values(this.innerComponents).forEach((value) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            item.eventBus.emit(Component.EVENTS.FLOW_CDM);
          });
        } else {
          value.eventBus.emit(Component.EVENTS.FLOW_CDM);
        }
      });
    }
  }

  #componentDidUpdate(oldProps: TProps, newProps: TProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response !== false) {
      this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  #render() {
    this.#element.innerHTML = '';

    this.#setClassName();

    this.#setAttributes();

    const content = this.render();

    if (content) {
      this.#element.append(content);
    }

    this._addEvents();
  }

  // * #region For user implementation

  componentDidMount(oldProps?: TProps) {}

  componentDidUpdate(oldProps: TProps, newProps: TProps): boolean | void {
    return !this.#shallowCompare(oldProps, newProps);
  }

  render(): DocumentFragment | HTMLElement | string | void {}

  // * endregion

  dispatchComponentDidMount() {
    this.eventBus.emit(Component.EVENTS.FLOW_CDM);
  }

  setProps = (nextProps: TProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  #makePropsProxy(props: TProps) {
    return new Proxy(props, {
      set: (target, key, value) => {
        if (typeof key === 'string') {
          const oldProps = { ...target };
          const newProps = target;
          newProps[key as keyof TProps] = value;

          this.eventBus.emit(Component.EVENTS.FLOW_CDU, oldProps, newProps);
          return true;
        }
        throw new Error('Cannot assign fields of props with symbol keys');
      },
      deleteProperty: () => {
        throw new Error('Cannot delete props');
      },
    });
  }

  #setClassName() {
    const { className } = this.props;
    if (className) {
      this.#element.className = className;
    }
  }

  #setAttributes() {
    const { attr: attributes } = this.props;

    if (attributes) {
      Object.keys(attributes).forEach((attr) => {
        this.#element.setAttribute(attr, attributes[attr]);
      });
    }
  }

  _removeEvents() {
    Object.entries(this.#DOMEvents).forEach(([eventName, listeners]) => {
      listeners.forEach((listener) => {
        this.#element.removeEventListener(eventName, listener);
      });
    });
    this.#DOMEvents = {};
  }

  _addEvents() {
    const { events } = this.props;

    if (events) {
      Object.entries(events).forEach(([eventName, listeners]) => {
        listeners.forEach((listener) => {
          this.#element.addEventListener(eventName, listener);
        });
      });
      this.#DOMEvents = events;
    }
  }

  compile(template: TemplateDelegate, propsWithComponents: TProps) {
    const propsAndStubs = { ...propsWithComponents };

    this.innerComponents =
      this.#extractComponentsFromProps(propsWithComponents);

    Object.entries(this.innerComponents).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const arStubs = value.map(
          (item) => `<div data-${item.props.__id}></div>`
        );
        // Не смог разрулить здесь тайпскрипт
        propsAndStubs[key as keyof TProps] = arStubs as any;
      } else {
        // Не смог разрулить здесь тайпскрипт
        propsAndStubs[key as keyof TProps] =
          `<div data-${value.props.__id}></div>` as any;
      }
    });

    const fragment = document.createElement('template');

    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.innerComponents).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((item) => {
          // TODO Remove dublicated code from here
          const stub = fragment.content.querySelector(
            `[data-${item.props.__id}]`
          );
          stub?.replaceWith(item.getContent());
        });
      } else {
        const stub = fragment.content.querySelector(
          `[data-${child.props.__id}]`
        );
        stub?.replaceWith(child.getContent());
      }
    });

    return fragment.content;
  }

  // * #region Creating element

  #createResources() {
    const { tagName } = this.#meta;
    this.#element = this.#createDocumentElement(tagName);
  }

  #createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    const element = document.createElement(tagName);
    element.setAttribute(`data-${this.#uuid}`, '');
    return element;
  }

  // * #endregion

  // * #region Element visibility

  show() {
    this.#element.style.display = 'block';
  }

  hide() {
    this.#element.style.display = 'none';
  }

  // * #endregion

  // * #region Helpers

  #shallowCompare(oldProps: TProps, newProps: TProps) {
    const oldKeys = Object.keys(oldProps);
    const newKeys = Object.keys(newProps);
    if (oldKeys.length !== newKeys.length) {
      return false;
    }
    const isNotEqual = oldKeys.some((key) => {
      if (oldProps[key] !== newProps[key]) {
        return true;
      }
      return false;
    });
    return !isNotEqual;
  }

  #extractComponentsFromProps(propsWithComponents: TProps) {
    const components: Record<string, Component | Component[]> = {};

    Object.entries(propsWithComponents).forEach(([key, value]) => {
      if (value instanceof Component) {
        components[key] = value;
      }
      // Support of arrays of components
      else if (Array.isArray(value)) {
        const arComponents = value.filter((arValue) => {
          return arValue instanceof Component;
        });
        if (arComponents.length === value.length) {
          components[key] = arComponents;
        } else {
          throw new TypeError('Mixed arrays do not supported');
        }
      }
    });
    return components;
  }
  // * #endregion
}
