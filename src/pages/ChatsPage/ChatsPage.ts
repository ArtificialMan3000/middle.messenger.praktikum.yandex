import { wrapper } from '~/src/view/View';
import tpl from './ChatsPage.hbs';
import contentTpl from './ChatsPageContent.hbs';
import * as css from './ChatsPage.module.scss';
import { Component, TComponentProps } from '~/src/view/Component';
import { ChatList } from '~/src/components/ChatList';
import { ChatWindow } from '~/src/components/ChatWindow';
import { Page } from '../Page';
import { UserController } from '~/src/controller';
import { withChats } from '~/src/hocs';

const userController = new UserController();

export class ChatsPage extends Component {
  constructor(props: TComponentProps) {
    super(props, 'main');
  }

  init() {
    userController.checkUser();

    super.init();
  }

  render() {
    const ChatListWithChats = withChats(ChatList);

    return this.compile(tpl, {
      Page: new Page(
        {
          children: wrapper(contentTpl, {
            css,
            className: css.page,
            ChatList: new ChatListWithChats({ className: css.chats }),
            MainChat: new ChatWindow({
              className: css.mainChat,
              chatNumber: this.props.id,
            }),
          }),
        },
        'div'
      ),
    });
  }
}
