import tpl from './FullAvatar.hbs';
import * as css from './FullAvatar.module.scss';

export const FullAvatar = ({ imageSrc, name, width, height }) => {
  width = width || 300;
  height = height || 300;
  return tpl({ imageSrc, name, width, height, css });
};
