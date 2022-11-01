import tpl from './Button.hbs';
import * as css from './Button.module.scss';

type Props = {
  className?: string;
  href?: string;
  type?: string;
  text?: string;
};

export const Button = ({ className, href, type, text }: Props) => {
  if (!type) {
    type = 'button';
  }

  return tpl({ className, href, type, text, css });
};
