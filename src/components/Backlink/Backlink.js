import tpl from './Backlink.hbs';
import * as css from './Backlink.module.scss';

export const Backlink = ({ href, text }) => {
  return tpl({ href, text, css });
};
