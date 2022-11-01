import tpl from './ChatsPage.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import { Component } from '~/src/typings/types';

export const ChatsPage: Component = (props) => {
  return tpl({ ...props, css: sharedCss });
};
