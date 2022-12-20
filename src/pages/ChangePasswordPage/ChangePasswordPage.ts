import tpl from './ChangePasswordPage.hbs';
import contentTpl from './ChangePasswordPageContent.hbs';
import * as css from './ChangePassword.module.scss';
import { Backlink } from '~/src/components/Backlink';
import { ChangePasswordForm } from '~/src/components/forms/ChangePasswordForm';
import { Window } from '~/src/components/Window';
import { Component, TComponentProps } from '~/src/view/Component';
import { setValidityStatus } from '~/src/controller/fieldValidation';
import { outputForm } from '~/src/model/features/outputForm';
import { Page } from '~/src/view/ui/Page';
import { wrapper } from '~/src/view/View';

type TProps = TComponentProps;
export class ChangePasswordPage extends Component<TProps> {
  constructor(props: TProps) {
    super(props, 'main');
  }

  render() {
    return this.compile(tpl, {
      css,
      Page: new Page(
        {
          children: wrapper(contentTpl, {
            className: css.container,
            Window: new Window({
              className: css.window,
              header: 'Сменить пароль',
              content: new ChangePasswordForm({
                events: {
                  submit: [
                    (evt: Event) => {
                      evt.preventDefault();
                      if (evt.target) {
                        outputForm(evt.target as HTMLFormElement);
                      }
                    },
                    (evt: Event) => {
                      evt.preventDefault();
                      const form = evt.target as HTMLFormElement;
                      const inputs = form.querySelectorAll('input');
                      inputs.forEach((input) => {
                        setValidityStatus(input);
                      });
                    },
                  ],
                  inputFocus: [
                    (evt) => {
                      setValidityStatus(evt.target as HTMLInputElement);
                    },
                  ],
                  inputBlur: [
                    (evt) => {
                      setValidityStatus(evt.target as HTMLInputElement);
                    },
                  ],
                },
              }),
              errorText: 'Сообщение об ошибке',
            }),
            Backlink: new Backlink({
              text: 'К чатам',
              location: '/chats',
            }),
          }),
        },
        'div'
      ),
    });
  }
}
