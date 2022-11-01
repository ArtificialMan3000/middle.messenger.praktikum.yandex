import tpl from './ChangePasswordForm.hbs';
import * as css from './ChangePasswordForm.module.scss';
import { Field } from '../Field';
import { Button } from '../Button';
import { Component } from '~/src/typings/types';

export const ChangePasswordForm: Component = (props) => {
  return tpl({
    ...props,
    OldPasswordField: Field({
      className: css.field,
      type: 'password',
      id: 'oldPassword',
      name: 'oldPassword',
      label: 'Старый пароль',
      placeholder: 'Старый пароль',
    }),
    NewPasswordField: Field({
      className: css.field,
      type: 'password',
      id: 'newPassword',
      name: 'newPassword',
      label: 'Новый пароль',
      placeholder: 'Новый пароль',
    }),
    RepeatPasswordField: Field({
      className: css.field,
      type: 'password',
      id: 'repeatPassword',
      name: 'repeatPassword',
      label: 'Повторите пароль',
      placeholder: 'Повторите пароль',
    }),
    SaveButton: Button({
      className: css.button,
      text: 'Сохранить',
    }),
  });
};
