import tpl from './ChangePasswordForm.hbs';
import * as css from './ChangePasswordForm.module.scss';
import { Field } from '../../Field';
import { Button } from '../../Button';
import { Component, TComponentProps } from '~/src/view/Component';
import { validationRules } from '~/src/model/features/fieldValidation';

type TProps = TComponentProps;

export class ChangePasswordForm extends Component<TProps> {
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
      css,
      OldPasswordField: new Field({
        className: css.field,
        type: 'password',
        id: 'oldPassword',
        name: 'oldPassword',
        label: 'Старый пароль',
        placeholder: 'Старый пароль',
      }),
      NewPasswordField: new Field({
        className: css.field,
        type: 'password',
        id: 'newPassword',
        name: 'newPassword',
        label: 'Новый пароль',
        placeholder: 'Новый пароль',
        validationText: validationRules.newPassword.description,
      }),
      RepeatPasswordField: new Field({
        className: css.field,
        type: 'password',
        id: 'repeatPassword',
        name: 'repeatPassword',
        label: 'Повторите пароль',
        placeholder: 'Повторите пароль',
      }),
      SaveButton: new Button({
        className: css.button,
        text: 'Сохранить',
        attr: { type: 'submit' },
      }),
    });
  }
}
