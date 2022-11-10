import tpl from './AuthForm.hbs';
import * as css from './AuthForm.module.scss';
import { Field } from '../Field';
import { Button } from '../Button';
import { Component, TComponentProps } from '~src/view/Component';
import { ButtonLink } from '../ButtonLink';

type TProps = TComponentProps;

export class AuthForm extends Component {
  constructor(props: TProps) {
    super(props, 'form');
  }

  render() {
    return this.compile(tpl, {
      LoginField: new Field({
        className: css.field,
        type: 'text',
        id: 'login',
        name: 'login',
        label: 'Логин',
        placeholder: 'Логин',
      }),
      PasswordField: new Field({
        className: css.field,
        type: 'password',
        id: 'password',
        name: 'password',
        label: 'Пароль',
        placeholder: 'Пароль',
      }),
      EnterButton: new Button({
        className: css.button,
        text: 'Войти',
      }),
      RegButton: new ButtonLink({
        className: css.button,
        text: 'Регистрация',
        attr: { href: 'reg.html' },
      }),
    });
  }
};
