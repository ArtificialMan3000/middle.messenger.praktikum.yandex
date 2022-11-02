import tpl from './AuthPage.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import { AuthForm } from '~/src/components/AuthForm';
import { Window } from '~/src/components/Window';
import { Component } from '~/src/typings/types';

export const AuthPage: Component = (properties) => {
  return tpl({
    ...properties,
    Window: Window({ header: 'Авторизация', children: AuthForm }),
    css: sharedCss,
  });
};
