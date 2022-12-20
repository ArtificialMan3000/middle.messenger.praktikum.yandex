import tpl from './ProfilePage.hbs';
import contentTpl from './ProfilePageContent.hbs';
import * as css from './ProfilePage.module.scss';
import { Backlink } from '~/src/components/Backlink';
import { FullAvatar } from '~/src/components/FullAvatar';
import { ProfileForm } from '~/src/components/forms/ProfileForm';
import { Window } from '~/src/components/Window';
import { Component, TComponentProps } from '~/src/view/Component';
import { setValidityStatus } from '~/src/controller/fieldValidation';
import { outputForm } from '~/src/model/features/outputForm';
import { UserController } from '~/src/controller/userProfileController';
import { ProfileController } from '~/src/controller/profile';
import { Page } from '~/src/view/ui/Page';
import { wrapper } from '~/src/view/View';

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
    super({ ...props, isLoaderDisplayed }, 'main');

    // userController.getUserProfile();
  }

  render() {
    const { isLoaderDisplayed } = this.props;

    return this.compile(tpl, {
      ...this.props,
      css,
      Page: new Page(
        {
          isLoaderDisplayed,
          children: wrapper(contentTpl, {
            className: css.container,
            css,
            Backlink: new Backlink({
              text: 'К чатам',
              location: '/chats',
            }),
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
        },
        'div'
      ),
    });
  }
};
