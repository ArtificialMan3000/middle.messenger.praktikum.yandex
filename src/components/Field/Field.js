import tpl from './Field.hbs';
import * as css from './Field.module.scss';

export const Field = ({ className, type, id, name, label, placeholder }) => {
  return tpl({ className, type, id, name, label, placeholder, css });
};
