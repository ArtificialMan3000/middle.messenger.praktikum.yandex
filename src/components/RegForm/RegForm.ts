import tpl from './RegForm.hbs';
import * as css from './RegForm.module.scss';
import { Field } from '../Field';
import { Button } from '../Button';
import { Component, TComponentProps } from '~src/view/Component';
import { ButtonLink } from '../ButtonLink';
import { validationRules } from '~src/model/features/fieldValidation';

type TProps = TComponentProps;

export class RegForm extends Component {
  constructor(props: TProps) {
    super(props, 'form');
  }

  _addEvents() {
    const { events = {} } = this.props;
    const {
      inputFocus: inputFocusListeners = [],
      inputBlur: inputBlurListeners = [],
    } = events;

    this.element.querySelectorAll('input').forEach((input) => {
      inputFocusListeners.forEach((inputFocusEvent) => {
        input.addEventListener('focus', inputFocusEvent);
      });
      inputBlurListeners.forEach((inputBlurEvent) => {
        input.addEventListener('blur', inputBlurEvent);
      });
    });

    super._addEvents();
  }

  render() {
    const FirstNameField = new Field({
      className: css.field,
      type: 'text',
      id: 'first_name',
      name: 'first_name',
      label: 'Имя',
      placeholder: 'Имя',
      validationText: validationRules.first_name.description,
    });

    const SecondNameField = new Field({
      className: css.field,
      type: 'text',
      id: 'second_name',
      name: 'second_name',
      label: 'Фамилия',
      placeholder: 'Фамилия',
      validationText: validationRules.second_name.description,
    });

    const LoginField = new Field({
      className: css.field,
      type: 'text',
      id: 'login',
      name: 'login',
      label: 'Логин',
      placeholder: 'Логин',
      validationText: validationRules.login.description,
    });

    const EmailField = new Field({
      className: css.field,
      type: 'email',
      id: 'email',
      name: 'email',
      label: 'Email',
      placeholder: 'Email',
      validationText: validationRules.email.description,
    });

    const PhoneField = new Field({
      className: css.field,
      type: 'tel',
      id: 'phone',
      name: 'phone',
      label: 'Телефон',
      placeholder: 'Телефон',
      validationText: validationRules.phone.description,
    });

    const PasswordField = new Field({
      className: css.field,
      type: 'password',
      id: 'newPassword',
      name: 'newPassword',
      label: 'Пароль',
      placeholder: 'Пароль',
      validationText: validationRules.newPassword.description,
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
