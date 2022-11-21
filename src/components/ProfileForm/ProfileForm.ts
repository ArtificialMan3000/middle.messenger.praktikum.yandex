import { validationRules } from '~/src/model/features/fieldValidation';
import tpl from './ProfileForm.hbs';
import * as css from './ProfileForm.module.scss';
import { EditField } from '../EditField';
import { Button } from '../Button';
import { Component, TComponentProps } from '~/src/view/Component';
import { ButtonLink } from '../ButtonLink';
import { Field } from '../Field';

type TProps = TComponentProps;

export class ProfileForm extends Component<TProps> {
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
      FirstNameField: new Field({
        className: css.field,
        type: 'text',
        id: 'first_name',
        name: 'first_name',
        label: 'Имя',
        value: 'Имя',
        validationText: validationRules.first_name.description,
      }),
      SecondNameField: new Field({
        className: css.field,
        type: 'text',
        id: 'second_name',
        name: 'second_name',
        label: 'Фамилия',
        value: 'Фамилия',
        validationText: validationRules.second_name.description,
      }),
      LoginField: new Field({
        className: css.field,
        type: 'text',
        id: 'login',
        name: 'login',
        label: 'Логин',
        value: 'Логин',
        validationText: validationRules.login.description,
      }),
      EmailField: new Field({
        className: css.field,
        type: 'email',
        id: 'email',
        name: 'email',
        label: 'Email',
        value: 'Email',
        validationText: validationRules.email.description,
      }),
      PhoneField: new Field({
        className: css.field,
        type: 'tel',
        id: 'phone',
        name: 'phone',
        label: 'Телефон',
        value: 'Телефон',
        validationText: validationRules.phone.description,
      }),
      DisplayNameField: new Field({
        className: css.field,
        type: 'text',
        id: 'display_name',
        name: 'display_name',
        label: 'Имя в чате',
        value: 'Имя в чате',
      }),
      SaveButton: new Button({
        className: css.button,
        text: 'Сохранить',
        attr: {
          type: 'submit',
        },
      }),
      LeaveButton: new Button({
        className: css.button,
        text: 'Выйти',
      }),
      ChangePasswordButton: new ButtonLink({
        className: css.button,
        text: 'Изменить пароль',
        attr: {
          href: 'change-password',
        },
      }),
    });
  }
}
