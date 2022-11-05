import tpl from './AuthForm.hbs';
import * as css from './AuthForm.module.scss';
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

export class AuthForm extends Component {
  constructor(props?: TProps) {
    super('form', props);
  }

  render() {
    return tpl({
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
      EnterButton: getComponentAsHTML(
        new Button({
          className: css.button,
          text: 'Войти',
        })
      ),
      RegButton: getComponentAsHTML(
        new Button({
          className: css.button,
          text: 'Регистрация',
          href: 'reg.html',
        })
      ),
    });
  }
};
