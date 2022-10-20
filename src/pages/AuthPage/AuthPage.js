import tpl from './AuthPage.hbs';
import * as css from './AuthPage.module.scss';
import { AuthForm } from '~/src/components/AuthForm';
import { Window } from '~/src/components/Window';

export const AuthPage = (props) => {
  return tpl({ ...props, css, Window: Window({ children: AuthForm }) });
};
