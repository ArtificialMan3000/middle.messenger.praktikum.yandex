import tpl from './ProfileForm.hbs';
import css from './ProfileForm.module.scss';
import { Button } from '../../Button';
import { Component } from '~/src/view/Component';
import { ButtonLink } from '~/src/view/ui/ButtonLink';
import { Form as FormBase } from '~/src/view/ui/Form';
import { ProfileController } from '~/src/controller/profile';
import { outputForm } from '~/src/model/features/outputForm';
import { makeFields } from '../makeFields';
import { UserController, TUserData, TFieldName } from '~/src/controller';
import { withError, withStatusMessage } from '~/src/hocs';

const profileController = new ProfileController();
const userController = new UserController();

const FIELDS_DATA = [
  {
    type: 'text',
    id: 'first_name',
    name: 'first_name' as TFieldName,
    label: 'Имя',
    placeholder: 'Имя',
  },
  {
    type: 'text',
    id: 'second_name',
    name: 'second_name' as TFieldName,
    label: 'Фамилия',
    placeholder: 'Фамилия',
  },
  {
    type: 'text',
    id: 'login',
    name: 'login' as TFieldName,
    label: 'Логин',
    placeholder: 'Логин',
  },
  {
    type: 'email',
    id: 'email',
    name: 'email' as TFieldName,
    label: 'Email',
    placeholder: 'Email',
  },
  {
    type: 'tel',
    id: 'phone',
    name: 'phone' as TFieldName,
    label: 'Телефон',
    placeholder: 'Телефон',
  },
  {
    type: 'text',
    id: 'display_name',
    name: 'display_name' as TFieldName,
    label: 'Имя в чате',
    placeholder: 'Имя в чате',
  },
];

type TProps = {
  userData?: TUserData | null;
};

export class ProfileForm extends Component<TProps> {
  render() {
    const fieldsDataWithValues = FIELDS_DATA.map((fieldData) => {
      const fieldName = fieldData.name;
      if (this.props.userData?.[fieldName]) {
        return { ...fieldData, value: this.props.userData[fieldName] };
      }
      return fieldData;
    });

    const fields = makeFields(fieldsDataWithValues, { className: css.field });

    const Form = withStatusMessage(withError(FormBase, 'profile'), 'profile');

    return this.compile(tpl, {
      ...this.props,
      css,
      Form: new Form({
        fields,
        buttons: [
          new Button({
            className: css.button,
            text: 'Сохранить',
            attr: {
              type: 'submit',
            },
          }),
          new Button({
            className: css.button,
            text: 'Выйти',
            events: {
              click: [
                (evt: Event) => {
                  evt.preventDefault();
                  userController.logout();
                },
              ],
            },
          }),
          ButtonLink({
            className: css.button,
            text: 'Изменить пароль',
            attr: {
              href: 'change-password',
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
            (evt: Event) => {
              profileController.onProfileFormSubmit(evt);
              userController.checkUser();
            },
          ],
        },
      }),
    });
  }
}
