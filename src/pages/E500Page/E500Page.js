import tpl from './E500Page.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import * as css from './E500.module.scss';

Object.assign(css, sharedCss);

export const E500Page = () => {
  return tpl({ css });
};
