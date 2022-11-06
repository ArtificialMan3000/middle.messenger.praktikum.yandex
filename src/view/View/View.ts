import { TCssModule } from './types';

export class View {
  static combineCssModules(css: TCssModule, ...cssModules: TCssModule[]) {
    return Object.assign(css, ...cssModules);
  }
}

export const { combineCssModules } = View;
