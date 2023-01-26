import { ChatController, TChatData } from '~/src/controller';
import { Component } from '~/src/view/Component';
import { Button } from '../Button';
import { ChatListItem } from '../ChatListItem';
import tpl from './ChatList.hbs';
import css from './ChatList.module.scss';

const chatController = new ChatController();

type TProps = {
  chatsData?: TChatData[];
};

export class ChatList extends Component<TProps> {
  init() {
    if (!this.props.chatsData || this.props.chatsData.length === 0) {
      chatController.getChats();
    }

    super.init();
  }

  render() {
    const { chatsData = [] } = this.props;

    const chats = chatsData.map((chatData) => {
      return new ChatListItem(
        {
          className: css.item,
          id: chatData.id,
          title: chatData.title,
          avatarSrc: chatData.avatar ?? undefined,
          lastMessage: chatData.last_message?.content,
          newMessagesCounter: chatData.unread_count,
          events: {
            click: [
              (evt: Event) => chatController.onChatClick(evt, chatData.id),
            ],
          },
        },
        'li'
      );
    });

    return this.compile(tpl, {
      css,
      chats,
      NewChatButton: new Button({
        text: 'Создать чат',
        events: { click: [chatController.onCreateChatButtonClick] },
      }),
    });
  }
}
