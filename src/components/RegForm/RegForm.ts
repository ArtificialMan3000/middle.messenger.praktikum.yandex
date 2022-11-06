import tpl from './RegForm.hbs';
import * as css from './RegForm.module.scss';
import { Field } from '../Field';
import { Button } from '../Button';
import {
  Component,
  getComponentAsHTML,
  TComponentProps,
} from '~src/view/Component';

type TProps = TComponentProps;

export class RegForm extends Component {
  constructor(props?: TProps) {
    super(props, 'form');
  }

  render() {
    return tpl({
      FirstNameField: getComponentAsHTML(
        new Field({
          className: css.field,
          type: 'text',
          id: 'first_name',
          name: 'first_name',
          label: 'Имя',
          placeholder: 'Имя',
        })
      ),
      SecondNameField: getComponentAsHTML(
        new Field({
          className: css.field,
          type: 'text',
          id: 'second_name',
          name: 'second_name',
          label: 'Фамилия',
          placeholder: 'Фамилия',
        })
      ),
      LoginField: getComponentAsHTML(
        new Field({
          className: css.field,
          type: 'text',
          id: 'login',
          name: 'login',
          label: 'Логин',
          placeholder: 'Логин',
        })
      ),
      EmailField: getComponentAsHTML(
        new Field({
          className: css.field,
          type: 'email',
          id: 'email',
          name: 'email',
          label: 'Email',
          placeholder: 'Email',
        })
      ),
      PhoneField: getComponentAsHTML(
        new Field({
          className: css.field,
          type: 'tel',
          id: 'phone',
          name: 'phone',
          label: 'Телефон',
          placeholder: 'Телефон',
        })
      ),
      PasswordField: getComponentAsHTML(
        new Field({
          className: css.field,
          type: 'password',
          id: 'password',
          name: 'password',
          label: 'Пароль',
          placeholder: 'Пароль',
        })
      ),
      RegButton: getComponentAsHTML(
        new Button({
          className: css.button,
          text: 'Зарегистрироваться',
        })
      ),
      EnterButton: getComponentAsHTML(
        new Button({
          className: css.button,
          text: 'Войти',
          href: 'auth.html',
        })
      ),
    });
  }
};
