import tpl from './ProfileForm.hbs';
import * as css from './ProfileForm.module.scss';
import { EditField } from '../EditField';
import { Button } from '../Button';
import {
  Component,
  getComponentAsHTML,
  TComponentProps,
} from '~src/view/Component';

type TProps = TComponentProps;

export class ProfileForm extends Component {
  constructor(props?: TProps) {
    super('form', props);
  }

  render() {
    return tpl({
      FirstNameField: getComponentAsHTML(
        new EditField({
          className: css.field,
          type: 'text',
          id: 'first_name',
          name: 'first_name',
          label: 'Имя',
          value: 'Имя',
        })
      ),
      SecondNameField: getComponentAsHTML(
        new EditField({
          className: css.field,
          type: 'text',
          id: 'second_name',
          name: 'second_name',
          label: 'Фамилия',
          value: 'Фамилия',
        })
      ),
      LoginField: getComponentAsHTML(
        new EditField({
          className: css.field,
          type: 'text',
          id: 'login',
          name: 'login',
          label: 'Логин',
          value: 'Логин',
        })
      ),
      EmailField: getComponentAsHTML(
        new EditField({
          className: css.field,
          type: 'email',
          id: 'email',
          name: 'email',
          label: 'Email',
          value: 'Email',
        })
      ),
      PhoneField: getComponentAsHTML(
        new EditField({
          className: css.field,
          type: 'tel',
          id: 'phone',
          name: 'phone',
          label: 'Телефон',
          value: 'Телефон',
        })
      ),
      DisplayNameField: getComponentAsHTML(
        new EditField({
          className: css.field,
          type: 'text',
          id: 'display_name',
          name: 'display_name',
          label: 'Имя в чате',
          value: 'Имя в чате',
        })
      ),
      LeaveButton: getComponentAsHTML(
        new Button({
          className: css.button,
          text: 'Выйти',
        })
      ),
      ChangePasswordButton: getComponentAsHTML(
        new Button({
          className: css.button,
          text: 'Изменить пароль',
          href: 'change-password.html',
        })
      ),
    });
  }
};
