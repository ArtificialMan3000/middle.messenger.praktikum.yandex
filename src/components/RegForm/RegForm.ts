import tpl from './RegForm.hbs';
import * as css from './RegForm.module.scss';
import { Field } from '../Field';
import { Button } from '../Button';
import { Component, TComponentProps } from '~src/view/Component';
import { ButtonLink } from '../ButtonLink';
import { fieldHandler } from '~src/controller/fieldHandler';

type TProps = TComponentProps;

export class RegForm extends Component {
  constructor(props: TProps) {
    super(props, 'form');
  }

  render() {
    const FirstNameField = new Field({
      className: css.field,
      type: 'text',
      id: 'first_name',
      name: 'first_name',
      label: 'Имя',
      placeholder: 'Имя',
      onInputFocus: fieldHandler,
      onInputBlur: fieldHandler,
    });

    const SecondNameField = new Field({
      className: css.field,
      type: 'text',
      id: 'second_name',
      name: 'second_name',
      label: 'Фамилия',
      placeholder: 'Фамилия',
      onInputFocus: fieldHandler,
      onInputBlur: fieldHandler,
    });

    const LoginField = new Field({
      className: css.field,
      type: 'text',
      id: 'login',
      name: 'login',
      label: 'Логин',
      placeholder: 'Логин',
      onInputFocus: fieldHandler,
      onInputBlur: fieldHandler,
    });

    const EmailField = new Field({
      className: css.field,
      type: 'email',
      id: 'email',
      name: 'email',
      label: 'Email',
      placeholder: 'Email',
      onInputFocus: fieldHandler,
      onInputBlur: fieldHandler,
    });

    const PhoneField = new Field({
      className: css.field,
      type: 'tel',
      id: 'phone',
      name: 'phone',
      label: 'Телефон',
      placeholder: 'Телефон',
      onInputFocus: fieldHandler,
      onInputBlur: fieldHandler,
    });

    const PasswordField = new Field({
      className: css.field,
      type: 'password',
      id: 'password',
      name: 'password',
      label: 'Пароль',
      placeholder: 'Пароль',
      onInputFocus: fieldHandler,
      onInputBlur: fieldHandler,
    });

    return this.compile(tpl, {
      FirstNameField,
      SecondNameField,
      LoginField,
      EmailField,
      PhoneField,
      PasswordField,
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
}
