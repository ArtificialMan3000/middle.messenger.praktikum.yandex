import { v4 as uuid } from 'uuid';
import { TEventsMap, TComponentProps, TComponentMeta } from './types';
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

  eventBus: EventBus;

  uuid: string;

  constructor(props: TComponentProps = {}, tagName = 'div') {
    this.#meta = {
      tagName,
      props,
    };

    this.uuid = uuid();
    this.#DOMEvents = {};

    this.props = this.#makePropsProxy(props);

    this.eventBus = new EventBus();

    this.#registerEvents(this.eventBus);
    this.eventBus.emit(Component.EVENTS.INIT);
  }

  #registerEvents(eventBus: EventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this.#componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this.#componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this.#render.bind(this));
  }

  #createResources() {
    const { tagName } = this.#meta;
    this.#element = this.#createDocumentElement(tagName);
    this.element.setAttribute(`data-${this.uuid}`, '');
  }

  init() {
    this.#createResources();

    this.eventBus.emit(Component.EVENTS.FLOW_CDM);
    this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
  }

  #componentDidMount() {
    this.componentDidMount(this.props);
  }

  componentDidMount(oldProps?: TComponentProps) {}

  dispatchComponentDidMount() {
    this.eventBus.emit(Component.EVENTS.FLOW_CDM);
  }

  #componentDidUpdate(oldProps: TComponentProps, newProps: TComponentProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      console.log('render');

      this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: TComponentProps, newProps: TComponentProps) {
    return !this.#shallowCompare(oldProps, newProps);
  }

  setComponentProps = (nextComponentProps: TComponentProps) => {
    if (!nextComponentProps) {
      return;
    }

    Object.assign(this.props, nextComponentProps);
  };

  get element() {
    return this.#element;
  }

  #render() {
    const renderedElement = document.querySelector(
      `[data-${this.uuid}]`
    ) as HTMLElement | null;
    if (!renderedElement) {
      this.#createResources();
    } else {
      this.#element = renderedElement;
    }

    const block = this.render();
    console.log(block);

    const { className, events, attr: attributes } = this.props;
    if (className) {
      this.#element.className = className;
    }
    if (attributes) {
      Object.keys(attributes).forEach((attr) => {
        this.#element.setAttribute(attr, attributes[attr]);
      });
    }
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду

    if (events) {
      Object.entries(events).forEach(([eventName, listeners]) => {
        const currEvents = this.#DOMEvents[eventName];
        listeners.forEach((listener) => {
          if (currEvents && !currEvents.includes(listener)) {
            this.#element.removeEventListener(eventName, listener);
          } else {
            this.#element.addEventListener(eventName, listener);
          }
        });
      });
      this.#DOMEvents = events;
    }

    if (block) {
      this.#element.innerHTML = block;
      console.dir(this.#element);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  render(): string | void {}

  getContent() {
    return this.element;
  }

  #makePropsProxy(props: TComponentProps) {
    return new Proxy(props, {
      set: (target, key, value) => {
        if (typeof key === 'string') {
          console.log(key);

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

  #createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.#element.style.display = 'block';
  }

  hide() {
    this.#element.style.display = 'none';
  }

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
}
