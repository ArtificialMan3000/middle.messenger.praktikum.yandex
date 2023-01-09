import tpl from './RegForm.hbs';
import * as css from './RegForm.module.scss';
import { Button } from '../../Button';
import { Component } from '~/src/view/Component';
import { ButtonLink } from '~/src/view/ui/ButtonLink';
import { makeFields } from '../makeFields';
import { SignUpController } from '~/src/controller';
import { outputForm } from '~/src/model/features/outputForm';
import { Form } from '~/src/view/ui/Form';

const FIELDS_DATA = [
  {
    type: 'text',
    id: 'first_name',
    name: 'first_name',
    label: 'Имя',
    placeholder: 'Имя',
  },
  {
    type: 'text',
    id: 'second_name',
    name: 'second_name',
    label: 'Фамилия',
    placeholder: 'Фамилия',
  },
  {
    type: 'text',
    id: 'login',
    name: 'login',
    label: 'Логин',
    placeholder: 'Логин',
  },
  {
    type: 'email',
    id: 'email',
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
  },
  {
    type: 'tel',
    id: 'phone',
    name: 'phone',
    label: 'Телефон',
    placeholder: 'Телефон',
  },
  {
    type: 'password',
    id: 'newPassword',
    name: 'newPassword',
    label: 'Пароль',
    placeholder: 'Пароль',
  },
];

const signUpController = new SignUpController();

export class RegForm extends Component {
  render() {
    const fields = makeFields(FIELDS_DATA, { className: css.field });

    return this.compile(tpl, {
      ...this.props,
      css,
      Form: new Form({
        className: 'reg-form',
        fields,
        buttons: [
          new Button({
            className: css.button,
            text: 'Зарегистрироваться',
            attr: {
              type: 'submit',
            },
          }),
          ButtonLink({
            className: css.button,
            text: 'Войти',
            location: '/auth',
            attr: {
              href: '/auth',
            },
          }),
        ],
        events: {
          submit: [
            (evt: Event) => {
              evt.preventDefault();
              if (evt.target) {
                outputForm(evt.target as HTMLFormElement);
              }
            },
            signUpController.onSignUpFormSubmit,
          ],
        },
      }),
    });
  }
}
