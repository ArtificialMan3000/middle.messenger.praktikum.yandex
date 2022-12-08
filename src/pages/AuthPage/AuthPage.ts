import tpl from './AuthPage.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import * as css from './AuthPage.module.scss';
import { AuthForm } from '~/src/components/forms/AuthForm';
import { Window } from '~/src/components/Window';
import {
  Component,
  extendClassName,
  TComponentProps,
} from '~/src/view/Component';
import { setValidityStatus } from '~/src/controller/fieldValidation';
import { outputForm } from '~/src/model/features/outputForm';
import { combineCssModules } from '~/src/view/View';
import { SignInController } from '~/src/controller/auth/signInController';

type TProps = TComponentProps;

combineCssModules(css, sharedCss);

const signInController = new SignInController();

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
              signInController.onSignInFormSubmit,
            ],
            inputFocus: [
              (evt: Event) => {
                setValidityStatus(evt.target as HTMLInputElement);
              },
            ],
            inputBlur: [
              (evt: Event) => {
                setValidityStatus(evt.target as HTMLInputElement);
              },
            ],
          },
        }),
      }),
      css: sharedCss,
    });
  }
}
