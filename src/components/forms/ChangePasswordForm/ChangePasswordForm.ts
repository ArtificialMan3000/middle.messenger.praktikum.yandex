import tpl from './ChangePasswordForm.hbs';
import * as css from './ChangePasswordForm.module.scss';
import { Button } from '../../Button';
import { Component } from '~/src/view/Component';
import { setValidityStatus } from '~/src/controller/fieldValidation';
import { Form as FormBase } from '~/src/view/ui/Form';
import { makeFields } from '../makeFields';
import { outputForm } from '~/src/model/features/outputForm';
import { withError, withMessage } from '~/src/hocs';
import { ChangePasswordController } from '~/src/controller';

const changePasswordController = new ChangePasswordController();

const FIELDS_DATA = [
  {
    type: 'password',
    id: 'oldPassword',
    name: 'oldPassword',
    label: 'Старый пароль',
    placeholder: 'Старый пароль',
  },
  {
    type: 'password',
    id: 'newPassword',
    name: 'newPassword',
    label: 'Новый пароль',
    placeholder: 'Новый пароль',
  },
  {
    type: 'password',
    id: 'repeatPassword',
    name: 'repeatPassword',
    label: 'Повторите пароль',
    placeholder: 'Повторите пароль',
  },
];

export class ChangePasswordForm extends Component {
  render() {
    const fields = makeFields(FIELDS_DATA, { className: css.field });

    const Form = withMessage(
      withError(FormBase, 'changePassword'),
      'changePassword'
    );

    return this.compile(tpl, {
      ...this.props,
      css,
      Form: new Form({
        fields,
        buttons: [
          new Button({
            className: css.button,
            text: 'Сохранить',
            attr: { type: 'submit' },
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
            changePasswordController.onChangePasswordFormSubmit,
          ],
        },
      }),
    });
  }
}
