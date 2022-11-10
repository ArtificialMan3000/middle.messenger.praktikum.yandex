import tpl from './ChangePasswordForm.hbs';
import * as css from './ChangePasswordForm.module.scss';
import { Field } from '../Field';
import { Button } from '../Button';
import { Component, TComponentProps } from '~src/view/Component';

type TProps = TComponentProps;

export class ChangePasswordForm extends Component {
  constructor(props: TProps) {
    super(props, 'form');
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
      }),
    });
  }
};
