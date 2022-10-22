import tpl from './ProfileForm.hbs';
import * as css from './ProfileForm.module.scss';
import { EditField } from '../EditField';
import { Button } from '../Button';

export const ProfileForm = (props) => {
  return tpl({
    ...props,
    FirstNameField: EditField({
      className: css.field,
      type: 'text',
      id: 'first_name',
      name: 'first_name',
      label: 'Имя',
      value: 'Имя',
    }),
    SecondNameField: EditField({
      className: css.field,
      type: 'text',
      id: 'second_name',
      name: 'second_name',
      label: 'Фамилия',
      value: 'Фамилия',
    }),
    LoginField: EditField({
      className: css.field,
      type: 'text',
      id: 'login',
      name: 'login',
      label: 'Логин',
      value: 'Логин',
    }),
    EmailField: EditField({
      className: css.field,
      type: 'email',
      id: 'email',
      name: 'email',
      label: 'Email',
      value: 'Email',
    }),
    PhoneField: EditField({
      className: css.field,
      type: 'tel',
      id: 'phone',
      name: 'phone',
      label: 'Телефон',
      value: 'Телефон',
    }),
    DisplayNameField: EditField({
      className: css.field,
      type: 'text',
      id: 'display_name',
      name: 'display_name',
      label: 'Имя в чате',
      value: 'Имя в чате',
    }),
    LeaveButton: Button({
      className: css.button,
      text: 'Выйти',
    }),
    ChangePasswordButton: Button({
      className: css.button,
      text: 'Изменить пароль',
      href: 'change-password.html',
    }),
  });
};
