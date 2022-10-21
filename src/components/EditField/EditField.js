import tpl from './EditField.hbs';
import * as css from './EditField.module.scss';

export const EditField = ({ className, type, id, name, label, value }) => {
  return tpl({ className, type, id, name, label, value, css });
};
