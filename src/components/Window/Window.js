import tpl from './Window.hbs';
import * as css from './Window.module.scss';

export const Window = ({ header, children }) => {
  return tpl({ header, children, css });
};
