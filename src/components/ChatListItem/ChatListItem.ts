import { Component } from '~/src/view/Component';
import { MiniAvatar } from '../MiniAvatar';
import tpl from './ChatListItem.hbs';
import * as css from './ChatListItem.module.scss';

export class ChatListItem extends Component {
  render() {
    return this.compile(tpl, {
      css,
      Avatar: new MiniAvatar({
        className: css.avatar,
        imageSrc: 'img/avatar.jpg',
      }),
      newMessagesCounter: 1,
    });
  }
}
