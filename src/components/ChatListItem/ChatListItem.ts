import { ChatController } from '~/src/controller/chat';
import { Component } from '~/src/view/Component';
import tpl from './ChatListItem.hbs';
import * as css from './ChatListItem.module.scss';

type TProps = {
  id: number;
  title: string;
  avatarSrc?: string;
  lastMessage?: string;
  newMessagesCounter?: number;
};

const chatController = new ChatController();

export class ChatListItem extends Component<TProps> {
  _addEvents() {
    const closeBtn = this.element.querySelector<HTMLButtonElement>(
      'button[data-selector=closeBtn]'
    );
    if (closeBtn) {
      closeBtn.addEventListener('click', (evt: Event) => {
        chatController.onDeleteChatButtonClick(evt, this.props.id);
      });
    }

    super._addEvents();
  }

  render() {
    const { title, lastMessage, newMessagesCounter } = this.props;

    return this.compile(tpl, {
      css,
      title,
      lastMessage,
      newMessagesCounter,
    });
  }
}
