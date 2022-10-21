import tpl from './ChatsPage.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';

export const ChatsPage = (props) => {
  return tpl({ ...props, css: sharedCss });
};
