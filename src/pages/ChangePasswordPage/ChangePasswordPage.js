import tpl from './ChangePasswordPage.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import * as css from './ChangePasswordPage.module.scss';
import { Backlink } from '~/src/components/Backlink';
import { ChangePasswordForm } from '~/src/components/ChangePasswordForm';
import { Window } from '~/src/components/Window';

Object.assign(css, sharedCss);

export const ChangePasswordPage = (props) => {
  return tpl({
    ...props,
    Window: Window({
      header: 'Сменить пароль',
      children: ChangePasswordForm,
    }),
    Backlink: Backlink({
      text: 'К чатам',
      href: 'chats.html',
    }),
    css,
  });
};
