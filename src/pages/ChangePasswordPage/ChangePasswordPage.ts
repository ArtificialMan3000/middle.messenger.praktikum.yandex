import tpl from './ChangePasswordPage.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import * as css from './ChangePassword.module.scss';
import { Backlink } from '~/src/components/Backlink';
import { ChangePasswordForm } from '~/src/components/ChangePasswordForm';
import { Window } from '~/src/components/Window';
import {
  Component,
  TComponentProps,
  extendClassName,
} from '~src/view/Component';
import { setValidityStatus } from '~src/model/features/fieldValidation';
import { outputForm } from '~src/model/features/outputForm';
import { combineCssModules } from '~src/view/View';

combineCssModules(css, sharedCss);

type TProps = TComponentProps;
export class ChangePasswordPage extends Component {
  constructor(props: TProps) {
    const className = extendClassName(sharedCss.siteWrapper, props.className);
    super({ ...props, className }, 'div');
  }

  addEvents() {
    this.element.querySelectorAll('input').forEach((input) => {
      input.addEventListener('focus', (evt) => {
        setValidityStatus(evt.target as HTMLInputElement, css.notValid);
      });

      input.addEventListener('blur', (evt) => {
        setValidityStatus(evt.target as HTMLInputElement, css.notValid);
      });
    });

    super.addEvents();
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
          },
        }),
        errorText: 'Сообщение об ошибке',
      }),
      Backlink: new Backlink({
        text: 'К чатам',
        attr: {
          href: 'chats.html',
        },
      }),
      css: sharedCss,
    });
  }
}
