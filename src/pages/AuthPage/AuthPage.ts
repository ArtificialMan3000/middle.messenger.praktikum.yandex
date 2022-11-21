import tpl from './AuthPage.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import * as css from './AuthPage.module.scss';
import { AuthForm } from '~/src/components/AuthForm';
import { Window } from '~/src/components/Window';
import {
  Component,
  extendClassName,
  TComponentProps,
} from '~/src/view/Component';
import { setValidityStatus } from '~/src/model/features/fieldValidation';
import { outputForm } from '~/src/model/features/outputForm';
import { combineCssModules } from '~/src/view/View';

combineCssModules(css, sharedCss);

type TProps = TComponentProps;

export class AuthPage extends Component<TProps> {
  constructor(props: TProps) {
    const className = extendClassName(sharedCss.siteWrapper, props.className);
    super({ ...props, className }, 'main');
  }

  render() {
    return this.compile(tpl, {
      Window: new Window({
        header: 'Авторизация',
        content: new AuthForm({
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
                console.log('validation');

                const form = evt.target as HTMLFormElement;
                const inputs = form.querySelectorAll('input');
                inputs.forEach((input) => {
                  setValidityStatus(input, css.notValid);
                });
              },
            ],
            inputFocus: [
              (evt: Event) => {
                setValidityStatus(evt.target as HTMLInputElement, css.notValid);
              },
            ],
            inputBlur: [
              (evt: Event) => {
                setValidityStatus(evt.target as HTMLInputElement, css.notValid);
              },
            ],
          },
        }),
      }),
      css: sharedCss,
    });
  }
}
