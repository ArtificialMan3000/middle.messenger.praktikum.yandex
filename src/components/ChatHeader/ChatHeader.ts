import { MiniAvatar } from '../MiniAvatar';
import { Component } from '~src/view/Component';
import tpl from './ChatHeader.hbs';
import * as css from './ChatHeader.module.scss';

export class ChatHeader extends Component<TProps> {
  render() {
    return this.compile(tpl, {
      css,
      Avatar: new MiniAvatar({
        className: css.avatar,
        imageSrc: 'img/avatar.jpg',
        width: 50,
        height: 50,
      }),
    });
  }
}
