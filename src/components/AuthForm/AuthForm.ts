import { validationRules } from '~src/model/features/fieldValidation';
import tpl from './AuthForm.hbs';
import * as css from './AuthForm.module.scss';
import { Field } from '../Field';
import { Button } from '../Button';
import { Component, TComponentProps } from '~src/view/Component';
import { ButtonLink } from '../ButtonLink';

type TProps = TComponentProps;

export class AuthForm extends Component {
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
    return this.compile(tpl, {
      LoginField: new Field({
        className: css.field,
        type: 'text',
        id: 'login',
        name: 'login',
        label: 'Логин',
        placeholder: 'Логин',
        validationText: validationRules.login.description,
      }),
      PasswordField: new Field({
        className: css.field,
        type: 'password',
        id: 'password',
        name: 'password',
        label: 'Пароль',
        placeholder: 'Пароль',
      }),
      EnterButton: new Button({
        className: css.button,
        text: 'Войти',
        attr: { type: 'submit' },
      }),
      RegButton: new ButtonLink({
        className: css.button,
        text: 'Регистрация',
        attr: { href: 'reg.html' },
      }),
    });
  }
}
