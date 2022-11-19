import tpl from './RegPage.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import * as css from './RegPage.module.scss';
import { RegForm } from '~/src/components/RegForm';
import { Window } from '~/src/components/Window';
import {
  Component,
  extendClassName,
  TComponentProps,
} from '~src/view/Component';
import { setValidityStatus } from '~src/model/features/fieldValidation';
import { outputForm } from '~src/model/features/outputForm';

Object.assign(css, sharedCss);

type TProps = TComponentProps;

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
      }),
      css,
    });
  }
};
