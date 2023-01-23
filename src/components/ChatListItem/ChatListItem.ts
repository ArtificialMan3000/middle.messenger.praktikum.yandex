import { Component } from '~/src/view/Component';
import { MiniAvatar } from '../MiniAvatar';
import tpl from './ChatListItem.hbs';
import * as css from './ChatListItem.module.scss';

type TProps = {
  title: string;
  avatarSrc?: string;
  lastMessage?: string;
  newMessagesCounter?: number;
};
export class ChatListItem extends Component<TProps> {
  render() {
    const { title, avatarSrc, lastMessage, newMessagesCounter } = this.props;

    return this.compile(tpl, {
      css,
      title,
      lastMessage,
      // Avatar: new MiniAvatar({
      //   className: css.avatar,
      //   imageSrc: avatarSrc ?? 'img/avatar.jpg',
      // }),
      newMessagesCounter,
    });
  }
}
