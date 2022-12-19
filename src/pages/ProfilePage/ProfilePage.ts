import tpl from './ProfilePage.hbs';
import contentTpl from './content.hbs';
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
import { ProfileController } from '~/src/controller/profile';
import { Page } from '~/src/view/ui/Page';
import { ProfilePageContent } from './ProfilePageContent';

// Object.assign(css, sharedCss);

const profileController = new ProfileController();

// const userController = new UserController();

export type TProfilePageProps = {
  isLoaderDisplayed?: boolean;
};

export class ProfilePage extends Component<TProfilePageProps> {
  constructor({
    isLoaderDisplayed = true,
    ...props
  }: TComponentProps<TProfilePageProps>) {
    // const className = extendClassName(sharedCss.siteWrapper, props.className);
    super({ ...props, isLoaderDisplayed }, 'main');

    // userController.getUserProfile();
  }

  render() {
    const { isLoaderDisplayed } = this.props;

    return this.compile(tpl, {
      ...this.props,
      css,
      Page: new Page({ isLoaderDisplayed }, 'div'),
      children: new ProfilePageContent({
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
                profileController.onChangeProfileFormSubmit,
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
        }),
        FullAvatar: new FullAvatar({
          imageSrc: 'img/avatar.jpg',
          name: 'Имя Фамилия',
        }),
      }),
    });
  }
};
