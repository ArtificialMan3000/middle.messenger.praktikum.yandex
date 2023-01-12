import tpl from './ProfilePage.hbs';
import contentTpl from './ProfilePageContent.hbs';
import * as css from './ProfilePage.module.scss';
import { Backlink } from '~/src/components/Backlink';
import { FullAvatar } from '~/src/components/FullAvatar';
import { ProfileForm as ProfileFormBase } from '~/src/components/forms/ProfileForm';
import { Window } from '~/src/components/Window';
import { Component, TComponentProps } from '~/src/view/Component';
import { Page } from '~/src/view/ui/Page';
import { wrapper } from '~/src/view/View';
import { UserController } from '~/src/controller';
import { withUserData } from '~/src/hocs/withUserData';

const userController = new UserController();

export class ProfilePage extends Component {
  constructor(props: TComponentProps) {
    super(props, 'main');

    // userController.getUserProfile();
  }

  init() {
    userController.checkUser();

    super.init();
  }

  render() {
    const ProfileForm = withUserData(ProfileFormBase);

    return this.compile(tpl, {
      ...this.props,
      css,
      Page: new Page(
        {
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
