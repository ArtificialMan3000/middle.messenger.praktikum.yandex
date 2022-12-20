import { notValid } from '~/src/scss/shared.module.scss';
import { TCssModule } from './types';
import { wrapper } from './wrapper';

const INVALID_CLASS: string = notValid;

export class View {
  static wrapper = wrapper;

  static extendClassName(additionalClass = '', className = '') {
    const whitespace = className.length > 0 ? ' ' : '';
    return `${className}${whitespace}${additionalClass}`;
  }

  static combineCssModules(css: TCssModule, ...cssModules: TCssModule[]) {
    return Object.assign(css, ...cssModules);
  }

  static markInvalid = (input: HTMLInputElement) => {
    input.classList.add(INVALID_CLASS);
  };

  static markValid = (input: HTMLInputElement) => {
    input.classList.remove(INVALID_CLASS);
  };
}

export const { extendClassName, combineCssModules, markInvalid, markValid } =
  View;
export { wrapper };
