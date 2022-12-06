import { notValid } from '~/src/scss/shared.module.scss';
import { TCssModule } from './types';

const INVALID_CLASS: string = notValid;

export class View {
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

export const { combineCssModules, markInvalid, markValid } = View;
