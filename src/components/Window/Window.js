import tpl from './Window.hbs';
import * as css from './Window.module.scss';

export const Window = ({ children }) => {
  console.log(children);
  return tpl({ children, css });
};
