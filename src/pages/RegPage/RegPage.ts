import tpl from './RegPage.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import * as css from './RegPage.module.scss';
import { RegForm } from '~/src/components/RegForm';
import { Window } from '~/src/components/Window';
import { Component } from '~/src/typings/types';

Object.assign(css, sharedCss);

export const RegPage: Component = (properties) => {
  return tpl({
    ...properties,
    Window: Window({ header: 'Регистрация', children: RegForm }),
    css,
  });
};
