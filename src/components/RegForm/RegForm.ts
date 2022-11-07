import tpl from './RegForm.hbs';
import * as css from './RegForm.module.scss';
import { Field } from '../Field';
import { Button } from '../Button';
import {
  Component,
  getComponentAsHTML,
  TComponentProps,
} from '~src/view/Component';
import { ButtonLink } from '../ButtonLink';

type TProps = TComponentProps;

export class RegForm extends Component {
  constructor(props?: TProps) {
    super(props, 'form');
  }

  render() {
    return this.compile(tpl, {
      FirstNameField: new Field({
        className: css.field,
        type: 'text',
        id: 'first_name',
        name: 'first_name',
        label: 'Имя',
        placeholder: 'Имя',
      }),
      SecondNameField: new Field({
        className: css.field,
        type: 'text',
        id: 'second_name',
        name: 'second_name',
        label: 'Фамилия',
        placeholder: 'Фамилия',
      }),
      LoginField: new Field({
        className: css.field,
        type: 'text',
        id: 'login',
        name: 'login',
        label: 'Логин',
        placeholder: 'Логин',
      }),
      EmailField: new Field({
        className: css.field,
        type: 'email',
        id: 'email',
        name: 'email',
        label: 'Email',
        placeholder: 'Email',
      }),
      PhoneField: new Field({
        className: css.field,
        type: 'tel',
        id: 'phone',
        name: 'phone',
        label: 'Телефон',
        placeholder: 'Телефон',
      }),
      PasswordField: new Field({
        className: css.field,
        type: 'password',
        id: 'password',
        name: 'password',
        label: 'Пароль',
        placeholder: 'Пароль',
      }),
      RegButton: new Button({
        className: css.button,
        text: 'Зарегистрироваться',
        attr: {
          type: 'submit',
        },
      }),
      EnterButton: new ButtonLink({
        className: css.button,
        text: 'Войти',
        attr: {
          href: 'auth.html',
        },
      }),
    });
  }
};
