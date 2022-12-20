import type { Component } from '../Component';

export const renderDOM = (DOMElement: HTMLElement, component: Component) => {
  DOMElement.appendChild(component.getContent());
  component.dispatchComponentDidMount();
};
