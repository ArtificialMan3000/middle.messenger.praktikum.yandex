import tpl from './AuthPage.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import * as css from './AuthPage.module.scss';
import { AuthForm } from '~/src/components/AuthForm';
import { Window } from '~/src/components/Window';

Object.assign(css, sharedCss);

export const AuthPage = (props) => {
  return tpl({
    ...props,
    css,
    Window: Window({ header: 'Авторизация', children: AuthForm }),
  });
};
