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

Object.assign(css, sharedCss);

type TProps = TComponentProps;

export class ProfilePage extends Component {
  constructor(props: TProps) {
    const className = extendClassName(sharedCss.siteWrapper, props.className);
    super({ ...props, className }, 'div');
  }

  render() {
    return this.compile(tpl, {
      css,
      Window: new Window({ content: new ProfileForm({}) }),
      FullAvatar: new FullAvatar({
        imageSrc: 'img/avatar.jpg',
        name: 'Имя Фамилия',
      }),
      Backlink: new Backlink({ href: 'chats.html', text: 'К чатам' }),
    });
  }
};
