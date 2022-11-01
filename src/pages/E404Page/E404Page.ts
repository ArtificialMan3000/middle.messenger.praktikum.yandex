import tpl from './E404Page.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import * as css from './E404.module.scss';

Object.assign(css, sharedCss);

export const E404Page = () => {
  return tpl({ css });
};
