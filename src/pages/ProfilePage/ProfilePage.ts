import tpl from './ProfilePage.hbs';
import contentTpl from './ProfilePageContent.hbs';
import * as css from './ProfilePage.module.scss';
import { Backlink } from '~/src/components/Backlink';
import { FullAvatar } from '~/src/components/FullAvatar';
import { ProfileForm } from '~/src/components/forms/ProfileForm';
import { Window } from '~/src/components/Window';
import { Component, TComponentProps } from '~/src/view/Component';
import { Page } from '~/src/view/ui/Page';
import { wrapper } from '~/src/view/View';

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
              content: new ProfileForm({}),
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
