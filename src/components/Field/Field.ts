import tpl from './Field.hbs';
import * as css from './Field.module.scss';
import { Component } from '~/src/typings/types';

export const Field: Component = ({
  className,
  type,
  id,
  name,
  label,
  placeholder,
}) => {
  return tpl({ className, type, id, name, label, placeholder, css });
};
