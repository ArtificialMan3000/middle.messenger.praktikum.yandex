import tpl from './ProfilePage.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import * as css from './ProfilePage.module.scss';
import { Backlink } from '~/src/components/Backlink';
import { FullAvatar } from '~/src/components/FullAvatar';
import { ProfileForm } from '~/src/components/ProfileForm';
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

export class ProfilePage extends Component {
  constructor(props: TProps) {
    const className = extendClassName(sharedCss.siteWrapper, props.className);
    super({ ...props, className }, 'main');
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
      css,
      Window: new Window({
        content: new ProfileForm({
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
      }),
      FullAvatar: new FullAvatar({
        imageSrc: 'img/avatar.jpg',
        name: 'Имя Фамилия',
      }),
      Backlink: new Backlink({ href: 'chats.html', text: 'К чатам' }),
    });
  }
};
