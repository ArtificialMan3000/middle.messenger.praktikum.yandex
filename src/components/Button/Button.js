import tpl from './Button.hbs';
import * as css from './Button.module.scss';

export const Button = ({ className, href, type, text }) => {
  if (!type) {
    type = 'button';
  }

  return tpl({ className, href, type, text, css });
};
