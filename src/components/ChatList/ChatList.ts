import { Component } from '~/src/view/Component';
import { ChatListItem } from '../ChatListItem';
import tpl from './ChatList.hbs';
import * as css from './ChatList.module.scss';

export class ChatList extends Component<TProps> {
  render() {
    return this.compile(tpl, {
      css,
      chats: [
        new ChatListItem({ className: css.item }, 'li'),
        new ChatListItem({ className: css.item }, 'li'),
        new ChatListItem({ className: css.item }, 'li'),
        new ChatListItem({ className: css.item }, 'li'),
        new ChatListItem({ className: css.item }, 'li'),
      ],
    });
  }
}
