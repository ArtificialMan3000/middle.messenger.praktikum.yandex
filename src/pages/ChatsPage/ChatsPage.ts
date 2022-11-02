import tpl from './ChatsPage.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import { Component } from '~/src/typings/types';

export const ChatsPage: Component = (properties) => {
  return tpl({ ...properties, css: sharedCss });
};
