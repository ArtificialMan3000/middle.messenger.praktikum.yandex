import tpl from './Backlink.hbs';
import * as css from './Backlink.module.scss';
import { Component } from '~/src/typings/types';

export const Backlink: Component = ({ href, text }) => {
  return tpl({ href, text, css });
};
