import { ChatController, TChatData } from '~/src/controller';
import { Component } from '~/src/view/Component';
import { ChatListItem } from '../ChatListItem';
import tpl from './ChatList.hbs';
import * as css from './ChatList.module.scss';

const chatController = new ChatController();

type TProps = {
  chatsData?: TChatData[];
};

export class ChatList extends Component<TProps> {
  init() {
    chatController.getChats();

    super.init();
  }

  render() {
    const { chatsData = [] } = this.props;

    const chats = chatsData.map((chatData) => {
      return new ChatListItem({
        className: css.item,
        title: chatData.title,
        avatarSrc: chatData.avatar ?? undefined,
        lastMessage: chatData.last_message?.content,
        newMessagesCounter: chatData.unread_count,
      });
    });

    return this.compile(tpl, {
      css,
      chats,
    });
  }
}
