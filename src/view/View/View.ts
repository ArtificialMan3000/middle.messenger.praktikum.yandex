import { notValid } from '~/src/scss/shared.module.scss';
import { Nullable } from '~/src/typings/utils';
import { TCssModule } from './types';
import { wrapper } from './wrapper';

const INVALID_CLASS: string = notValid;

export class View {
  static wrapper = wrapper;

  static makeClassNames(...classes: Nullable<string>[]) {
    return classes.filter((className) => className).join(' ');
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

export const { makeClassNames, combineCssModules, markInvalid, markValid } =
  View;
export { wrapper };
