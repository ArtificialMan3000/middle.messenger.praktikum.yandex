import tpl from './ProfilePage.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import * as css from './ProfilePage.module.scss';
import { Backlink } from '~/src/components/Backlink';
import { FullAvatar } from '~/src/components/FullAvatar';
import { ProfileForm } from '~/src/components/forms/ProfileForm';
import { Window } from '~/src/components/Window';
import {
  Component,
  extendClassName,
  TComponentProps,
} from '~/src/view/Component';
import { setValidityStatus } from '~/src/controller/fieldValidation';
import { outputForm } from '~/src/model/features/outputForm';
import { UserController } from '~/src/controller/userProfileController';

Object.assign(css, sharedCss);

export type TProfilePageProps = {
  isLoaderDisplayed?: boolean;
};

const userController = new UserController();

export class ProfilePage extends Component<TProfilePageProps> {
  constructor({
    isLoaderDisplayed = true,
    ...props
  }: TComponentProps<TProfilePageProps>) {
    const className = extendClassName(sharedCss.siteWrapper, props.className);
    super({ ...props, isLoaderDisplayed, className }, 'main');

    userController.getUserProfile();
  }

  render() {
    return this.compile(tpl, {
      ...this.props,
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
      FullAvatar: new FullAvatar({
        imageSrc: 'img/avatar.jpg',
        name: 'Имя Фамилия',
      }),
      Backlink: new Backlink({ location: '/chats', text: 'К чатам' }),
    });
  }
};
