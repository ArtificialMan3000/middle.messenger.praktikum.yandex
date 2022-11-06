import { Component, getComponentAsHTML } from '~/src/view/Component';
import { ChatListItem } from '../ChatListItem';
import tpl from './ChatList.hbs';
import * as css from './ChatList.module.scss';

export class ChatList extends Component {
  render() {
    return tpl({
      css,
      chats: [
        getComponentAsHTML(new ChatListItem({ className: css.item }, 'li')),
        getComponentAsHTML(new ChatListItem({ className: css.item }, 'li')),
        getComponentAsHTML(new ChatListItem({ className: css.item }, 'li')),
        getComponentAsHTML(new ChatListItem({ className: css.item }, 'li')),
        getComponentAsHTML(new ChatListItem({ className: css.item }, 'li')),
      ],
    });
  }
}
