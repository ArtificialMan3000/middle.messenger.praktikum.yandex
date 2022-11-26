import tpl from './ChangePasswordPage.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import * as css from './ChangePassword.module.scss';
import { Backlink } from '~/src/components/Backlink';
import { ChangePasswordForm } from '~/src/components/forms/ChangePasswordForm';
import { Window } from '~/src/components/Window';
import {
  Component,
  TComponentProps,
  extendClassName,
} from '~/src/view/Component';
import { setValidityStatus } from '~/src/model/features/fieldValidation';
import { outputForm } from '~/src/model/features/outputForm';
import { combineCssModules } from '~/src/view/View';

combineCssModules(css, sharedCss);

type TProps = TComponentProps;
export class ChangePasswordPage extends Component<TProps> {
  constructor(props: TProps) {
    const className = extendClassName(sharedCss.siteWrapper, props.className);
    super({ ...props, className }, 'main');
  }

  render() {
    return this.compile(tpl, {
      Window: new Window({
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
                  setValidityStatus(input, css.notValid);
                });
              },
            ],
            inputFocus: [
              (evt) => {
                setValidityStatus(evt.target as HTMLInputElement, css.notValid);
              },
            ],
            inputBlur: [
              (evt) => {
                setValidityStatus(evt.target as HTMLInputElement, css.notValid);
              },
            ],
          },
        }),
        errorText: 'Сообщение об ошибке',
      }),
      Backlink: new Backlink({
        text: 'К чатам',
        attr: {
          href: '/chats',
        },
      }),
      css: sharedCss,
    });
  }
}
