import {
  setValidityStatus,
  validationRules,
} from '~/src/controller/fieldValidation';
import tpl from './ProfileForm.hbs';
import * as css from './ProfileForm.module.scss';
import { Button } from '../../Button';
import { Component } from '~/src/view/Component';
import { Field } from '../../Field';
import { ButtonLink } from '~/src/view/ui/ButtonLink';
import { Form } from '~/src/view/ui/Form';
import { TComponentPropsType } from '~/src/typings/utils';
import { ProfileController } from '~/src/controller/profile';
import { outputForm } from '~/src/model/features/outputForm';

const profileController = new ProfileController();

const FIELDS_DATA = [
  {
    type: 'text',
    id: 'first_name',
    name: 'first_name',
    label: 'Имя',
    value: 'Имя',
  },
  {
    type: 'text',
    id: 'second_name',
    name: 'second_name',
    label: 'Фамилия',
    value: 'Фамилия',
  },
  {
    type: 'text',
    id: 'login',
    name: 'login',
    label: 'Логин',
    value: 'Логин',
  },
  {
    type: 'email',
    id: 'email',
    name: 'email',
    label: 'Email',
    value: 'Email',
  },
  {
    type: 'tel',
    id: 'phone',
    name: 'phone',
    label: 'Телефон',
    value: 'Телефон',
  },
  {
    type: 'text',
    id: 'display_name',
    name: 'display_name',
    label: 'Имя в чате',
    value: 'Имя в чате',
  },
];

export class ProfileForm extends Component {
  render() {
    const fields = FIELDS_DATA.map((fieldData) => {
      const fieldProps: TComponentPropsType<Field> = {
        className: css.field,
        type: fieldData.type,
        id: fieldData.id,
        name: fieldData.name,
        label: fieldData.label,
        value: fieldData.value,
      };
      if (validationRules[fieldData.name]) {
        fieldProps.onFocus = (evt: Event) => {
          setValidityStatus(evt.target as HTMLInputElement);
        };
        fieldProps.onBlur = (evt: Event) => {
          setValidityStatus(evt.target as HTMLInputElement);
        };
        fieldProps.validationText = validationRules[fieldData.name].description;
      }
      return new Field(fieldProps);
    });

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
            profileController.onProfileFormSubmit,
          ],
        },
      }),
    });
  }
}
