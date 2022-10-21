import tpl from './ChangePasswordForm.hbs';
import * as css from './ChangePasswordForm.module.scss';
import { Field } from '../Field';
import { Button } from '../Button';

export const ChangePasswordForm = (props) => {
  return tpl({
    ...props,
    OldPasswordField: Field({
      className: css.field,
      type: 'password',
      id: 'old-password',
      name: 'old-password',
      label: 'Старый пароль',
      placeholder: 'Старый пароль',
    }),
    NewPasswordField: Field({
      className: css.field,
      type: 'password',
      id: 'new-password',
      name: 'new-password',
      label: 'Новый пароль',
      placeholder: 'Новый пароль',
    }),
    RepeatPasswordField: Field({
      className: css.field,
      type: 'password',
      id: 'repeat-password',
      name: 'repeat-password',
      label: 'Повторите пароль',
      placeholder: 'Повторите пароль',
    }),
    SaveButton: Button({
      className: css.button,
      text: 'Сохранить',
    }),
  });
};
