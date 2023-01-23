import { wrapper } from '~/src/view/View';
import tpl from './ChatsPage.hbs';
import contentTpl from './ChatsPageContent.hbs';
import * as css from './ChatsPage.module.scss';
import { Component, TComponentProps } from '~/src/view/Component';
import { ChatList } from '~/src/components/ChatList';
import { ChatWindow } from '~/src/components/ChatWindow';
import { Page } from '../Page';
import { UserController, ChatController } from '~/src/controller';
import { withChatList } from '~/src/hocs';
import { withChat } from '~/src/hocs/withChat';

const userController = new UserController();
const chatController = new ChatController();

type TProps = {
  id?: number | string;
};

export class ChatsPage extends Component<TProps> {
  constructor(props: TComponentProps) {
    super(props, 'main');
  }

  componentDidMount() {
    userController.checkUser().then(() => {
      if (this.props.id) {
        chatController.getSingleChat(Number(this.props.id));
      }
    });
  }

  componentDidUpdate() {
    if (this.props.id) {
      chatController.getSingleChat(Number(this.props.id));
    }
  }

  render() {
    const ChatListWithChats = withChatList(ChatList);

    const ChatWindowWithChat = withChat(ChatWindow);

    return this.compile(tpl, {
      Page: new Page(
        {
          children: wrapper(contentTpl, {
            css,
            className: css.page,
            ChatList: new ChatListWithChats({ className: css.chats }),
            MainChat: new ChatWindowWithChat({
              className: css.mainChat,
            }),
          }),
        },
        'div'
      ),
    });
  }
}
