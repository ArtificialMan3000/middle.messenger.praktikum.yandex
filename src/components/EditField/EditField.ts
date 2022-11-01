import tpl from './EditField.hbs';
import * as css from './EditField.module.scss';
import { Component } from '~/src/typings/types';

export const EditField: Component = ({
  className,
  type,
  id,
  name,
  label,
  value,
}) => {
  return tpl({ className, type, id, name, label, value, css });
};
