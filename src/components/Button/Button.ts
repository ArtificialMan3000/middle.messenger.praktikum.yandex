import tpl from './Button.hbs';
import * as css from './Button.module.scss';

type Properties = {
  className?: string;
  href?: string;
  type?: string;
  text?: string;
};

export const Button = ({
  className,
  href,
  type = 'button',
  text,
}: Properties) => {
  return tpl({ className, href, type, text, css });
};
