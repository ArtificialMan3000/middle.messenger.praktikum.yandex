import { validationRules } from '~/src/controller/fieldValidation';
import tpl from './AuthForm.hbs';
import * as css from './AuthForm.module.scss';
import { Field } from '../../Field';
import { Button } from '../../Button';
import { Component, TComponentProps } from '~/src/view/Component';
import { ButtonLink } from '~/src/view/ui/ButtonLink';
import { UserAuthController } from '~/src/controller/auth/userAuthController';

type TProps = {
  loader?: boolean;
} & TComponentProps;

export class AuthForm extends Component<TProps> {
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
    const { loader } = this.props;
    return this.compile(tpl, {
      loader,
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
      RegButton: ButtonLink({
        className: css.button,
        text: 'Регистрация',
        location: '/reg',
      }),
    });
  }
}
