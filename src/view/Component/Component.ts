import { v4 as uuid } from 'uuid';
import { TemplateDelegate } from 'handlebars';
import {
  TEventsMap,
  TComponentProps,
  TComponentMeta,
  TComponentChildren,
} from './types';
import { EventBus } from '../../controller/EventBus/EventBus';

export class Component {
  static EVENTS: Record<string, string> = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  #element: HTMLElement;

  #meta: TComponentMeta;

  #DOMEvents: TEventsMap;

  props: TComponentProps;

  children: TComponentChildren;

  eventBus: EventBus;

  #uuid: string;

  constructor(props: TComponentProps = {}, tagName = 'div') {
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
  }

  #componentDidUpdate(oldProps: TComponentProps, newProps: TComponentProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
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

    this.#addEvents();
  }

  // * #region For user implementation
  componentDidMount: (oldProps?: TComponentProps) => unknown =
    function componentDidMount() {};

  componentDidUpdate(oldProps: TComponentProps, newProps: TComponentProps) {
    return !this.#shallowCompare(oldProps, newProps);
  }

  render(): DocumentFragment | HTMLElement | string | void {}

  // * endregion

  dispatchComponentDidMount() {
    this.eventBus.emit(Component.EVENTS.FLOW_CDM);
  }

  setProps = (nextProps: TComponentProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  #makePropsProxy(props: TComponentProps) {
    return new Proxy(props, {
      set: (target, key, value) => {
        if (typeof key === 'string') {
          // console.log(key);

          const oldProps = { ...target };
          const newProps = target;
          newProps[key] = value;

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

  #addEvents() {
    const { events } = this.props;

    if (events) {
      Object.entries(events).forEach(([eventName, listeners]) => {
        const currEvents = this.#DOMEvents[eventName];
        // console.log('events', events);

        listeners.forEach((listener) => {
          if (currEvents && !currEvents.includes(listener)) {
            // console.log('remove');

            this.#element.removeEventListener(eventName, listener);
          } else {
            // console.log('add');
            // console.dir(this.#element);
            // console.log(eventName);

            // console.log(listener);

            this.#element.addEventListener(eventName, listener);
          }
        });
      });
      this.#DOMEvents = events;
    }
  }

  compile(template: TemplateDelegate, propsWithComponents: TComponentProps) {
    const propsAndStubs = { ...propsWithComponents };

    const innerComponents =
      this.#extractComponentsFromProps(propsWithComponents);

    Object.entries(innerComponents).forEach(([key, value]) => {
      propsAndStubs[key] = `<div data-${value.props.__id}></div>`;
    });

    const fragment = document.createElement('template');

    fragment.innerHTML = template(propsAndStubs);

    Object.values(innerComponents).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-${child.props.__id}`);
      stub?.replaceWith(child.getContent());
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

  #shallowCompare(oldProps: TComponentProps, newProps: TComponentProps) {
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

  #extractComponentsFromProps(propsWithComponents: TComponentProps) {
    const components: Record<string, Component> = {};

    Object.entries(propsWithComponents).forEach(([key, value]) => {
      if (value instanceof Component) {
        components[key] = value;
      }
    });
    return components;
  }
  // * #endregion
}
