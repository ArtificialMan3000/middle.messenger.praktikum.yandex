import tpl from './AuthPage.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import { AuthForm } from '~/src/components/AuthForm';
import { Window } from '~/src/components/Window';

export const AuthPage = (props) => {
  return tpl({
    ...props,
    Window: Window({ header: 'Авторизация', children: AuthForm }),
    css: sharedCss,
  });
};
