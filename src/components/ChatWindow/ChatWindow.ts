import { messagesController, TChatData } from '~/src/controller';
import { withChatMessages } from '~/src/hocs/withChatMessages';
import { Component } from '~/src/view/Component';
import { ChatHeader } from '../ChatHeader';
import { ChatMain } from '../ChatMain';
import tpl from './ChatWindow.hbs';
import * as css from './ChatWindow.module.scss';

type TProps = {
  chatData?: TChatData;
};

export class ChatWindow extends Component<TProps> {
  componentDidMount() {
    const { id: chatId } = this.props.chatData ?? {};

    if (chatId) {
      messagesController.connect(chatId).then(() => {
        messagesController.getMessages(chatId);
      });
    }
  }

  componentDidUpdate() {
    const { id: chatId } = this.props.chatData ?? {};

    if (chatId) {
      messagesController.connect(chatId).then(() => {
        messagesController.getMessages(chatId);
      });
    }
  }

  render() {
    const ChatMainWithMessages = withChatMessages(ChatMain);

    const { title = '', id } = this.props.chatData ?? {};
    return this.compile(tpl, {
      css,
      Header: new ChatHeader({
        className: css.header,
        name: title,
      }),
      Main: new ChatMainWithMessages({ className: css.main, chatId: id }),
    });
  }
}
