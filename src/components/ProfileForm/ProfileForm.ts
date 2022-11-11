import tpl from './ProfileForm.hbs';
import * as css from './ProfileForm.module.scss';
import { EditField } from '../EditField';
import { Button } from '../Button';
import { Component, TComponentProps } from '~src/view/Component';
import { ButtonLink } from '../ButtonLink';

type TProps = TComponentProps;

export class ProfileForm extends Component {
  constructor(props: TProps) {
    super(props, 'form');
  }

  render() {
    return this.compile(tpl, {
      FirstNameField: new EditField({
        className: css.field,
        type: 'text',
        id: 'first_name',
        name: 'first_name',
        label: 'Имя',
        value: 'Имя',
      }),
      SecondNameField: new EditField({
        className: css.field,
        type: 'text',
        id: 'last_name',
        name: 'last_name',
        label: 'Фамилия',
        value: 'Фамилия',
      }),
      LoginField: new EditField({
        className: css.field,
        type: 'text',
        id: 'login',
        name: 'login',
        label: 'Логин',
        value: 'Логин',
      }),
      EmailField: new EditField({
        className: css.field,
        type: 'email',
        id: 'email',
        name: 'email',
        label: 'Email',
        value: 'Email',
      }),
      PhoneField: new EditField({
        className: css.field,
        type: 'tel',
        id: 'phone',
        name: 'phone',
        label: 'Телефон',
        value: 'Телефон',
      }),
      DisplayNameField: new EditField({
        className: css.field,
        type: 'text',
        id: 'display_name',
        name: 'display_name',
        label: 'Имя в чате',
        value: 'Имя в чате',
      }),
      LeaveButton: new Button({
        className: css.button,
        text: 'Выйти',
      }),
      ChangePasswordButton: new ButtonLink({
        className: css.button,
        text: 'Изменить пароль',
        attr: {
          href: 'change-password.html',
        },
      }),
    });
  }
};
