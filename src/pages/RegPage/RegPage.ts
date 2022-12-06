import tpl from './RegPage.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import * as css from './RegPage.module.scss';
import { RegForm } from '~/src/components/forms/RegForm';
import { Window } from '~/src/components/Window';
import {
  Component,
  extendClassName,
  TComponentProps,
} from '~/src/view/Component';
import { outputForm } from '~/src/model/features/outputForm';
import { UserAuthController } from '~/src/controller/auth/userAuthController';
import { setValidityStatus } from '~/src/controller/fieldValidation';

Object.assign(css, sharedCss);

type TProps = TComponentProps;

const userController = new UserAuthController();
export class RegPage extends Component<TProps> {
  constructor(props: TProps) {
    const className = extendClassName(sharedCss.siteWrapper, props.className);
    super({ ...props, className }, 'main');
  }

  render() {
    return this.compile(tpl, {
      Window: new Window({
        header: 'Регистрация',
        content: new RegForm({
          className: 'reg-form',
          events: {
            submit: [
              (evt: Event) => {
                evt.preventDefault();
                if (evt.target) {
                  outputForm(evt.target as HTMLFormElement);
                }
              },
              userController.onSignUpFormSubmit,
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
      css,
    });
  }
};
