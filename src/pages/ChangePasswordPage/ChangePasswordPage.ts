import tpl from './ChangePasswordPage.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import { Backlink } from '~/src/components/Backlink';
import { ChangePasswordForm } from '~/src/components/ChangePasswordForm';
import { Window } from '~/src/components/Window';
import { Component } from '~/src/typings/types';

export const ChangePasswordPage: Component = (properties) => {
  return tpl({
    ...properties,
    Window: Window({
      header: 'Сменить пароль',
      children: ChangePasswordForm,
    }),
    Backlink: Backlink({
      text: 'К чатам',
      href: 'chats.html',
    }),
    css: sharedCss,
  });
};
