import tpl from './RegForm.hbs';
import * as css from './RegForm.module.scss';
import { Field } from '../Field';
import { Button } from '../Button';

export const RegForm = (props) => {
  return tpl({
    ...props,
    NameField: Field({
      className: css.field,
      type: 'text',
      id: 'name',
      name: 'name',
      label: 'Имя',
      placeholder: 'Имя',
    }),
    LastnameField: Field({
      className: css.field,
      type: 'text',
      id: 'lastname',
      name: 'lastname',
      label: 'Фамилия',
      placeholder: 'Фамилия',
    }),
    LoginField: Field({
      className: css.field,
      type: 'text',
      id: 'login',
      name: 'login',
      label: 'Логин',
      placeholder: 'Логин',
    }),
    EmailField: Field({
      className: css.field,
      type: 'email',
      id: 'email',
      name: 'email',
      label: 'Email',
      placeholder: 'Email',
    }),
    PhoneField: Field({
      className: css.field,
      type: 'tel',
      id: 'phone',
      name: 'phone',
      label: 'Телефон',
      placeholder: 'Телефон',
    }),
    PasswordField: Field({
      className: css.field,
      type: 'password',
      id: 'password',
      name: 'password',
      label: 'Пароль',
      placeholder: 'Пароль',
    }),
    RegButton: Button({
      className: css.button,
      text: 'Зарегистрироваться',
    }),
    EnterButton: Button({
      className: css.button,
      text: 'Войти',
      href: 'auth.html',
    }),
  });
};
