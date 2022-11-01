import tpl from './FullAvatar.hbs';
import * as css from './FullAvatar.module.scss';
import { Component } from '~/src/typings/types';

export const FullAvatar: Component = ({
  imageSrc,
  name,
  width = 300,
  height = 300,
}) => {
  return tpl({ imageSrc, name, width, height, css });
};
