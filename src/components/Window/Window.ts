import tpl from './Window.hbs';
import * as css from './Window.module.scss';
import { Component } from '~/src/typings/types';

export const Window: Component = ({ header, children }) => {
  return tpl({ header, children, css });
};
