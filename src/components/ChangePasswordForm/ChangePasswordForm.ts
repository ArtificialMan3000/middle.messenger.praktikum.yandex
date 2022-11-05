import tpl from './ChangePasswordForm.hbs';
import * as css from './ChangePasswordForm.module.scss';
import { Field } from '../Field';
import { Button } from '../Button';
import {
  Component,
  getComponentAsHTML,
  TComponentProps,
} from '~src/view/Component';

// const button = new Button({
//   className: css.button,
//   text: 'Сохранить',
// });
// button.init();
// window.button = button;
// const button2 = new Button({
//   className: css.button,
//   text: 'Сохранитьs',
// });
// button2.init();
type TProps = TComponentProps;

export class ChangePasswordForm extends Component {
  constructor(props?: TProps) {
    super('form', props);
  }

  render() {
    return tpl({
      css,
      OldPasswordField: getComponentAsHTML(
        new Field({
          className: css.field,
          type: 'password',
          id: 'oldPassword',
          name: 'oldPassword',
          label: 'Старый пароль',
          placeholder: 'Старый пароль',
        })
      ),
      NewPasswordField: getComponentAsHTML(
        new Field({
          className: css.field,
          type: 'password',
          id: 'newPassword',
          name: 'newPassword',
          label: 'Новый пароль',
          placeholder: 'Новый пароль',
        })
      ),
      RepeatPasswordField: getComponentAsHTML(
        new Field({
          className: css.field,
          type: 'password',
          id: 'repeatPassword',
          name: 'repeatPassword',
          label: 'Повторите пароль',
          placeholder: 'Повторите пароль',
        })
      ),
      SaveButton: getComponentAsHTML(
        new Button({
          className: css.button,
          text: 'Сохранить',
        })
      ),
    });
  }
};
