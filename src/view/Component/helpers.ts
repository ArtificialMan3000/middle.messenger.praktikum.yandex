import { Component } from './Component';

export function extendClassName(additionalClass = '', className = '') {
  const whitespace = className.length > 0 ? ' ' : '';
  return `${className}${whitespace}${additionalClass}`;
}

export function getComponentAsHTML(component: Component) {
  return component.getContent().outerHTML;
}
