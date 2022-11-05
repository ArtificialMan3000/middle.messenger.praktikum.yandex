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
  getComponentAsHTML,
  TComponentProps,
} from '~src/view/Component';

Object.assign(css, sharedCss);

type TProps = TComponentProps;

export class ProfilePage extends Component {
  constructor(props: TProps) {
    const className = extendClassName(
      sharedCss['site-wrapper'],
      props.className
    );
    super('div', { ...props, className });
  }

  render() {
    return tpl({
      css,
      Window: getComponentAsHTML(
        new Window({ content: getComponentAsHTML(new ProfileForm()) })
      ),
      FullAvatar: getComponentAsHTML(
        new FullAvatar({ imageSrc: 'img/avatar.jpg', name: 'Имя Фамилия' })
      ),
      Backlink: getComponentAsHTML(
        new Backlink({ href: 'chats.html', text: 'К чатам' })
      ),
    });
  }
};
