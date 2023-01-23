import RouterManagement from '~/src/controller/RouterManagement';
import { ChatAPI } from '~/src/api/chatApi';
import { store } from '~/src/store';
import { TUserData } from '../user';

export type TChatData = {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  last_message: {
    user: Omit<TUserData, 'id' | 'display_name'>;
    time: string;
    content: string;
  } | null;
};

export class ChatController {
  ChatApi: ChatAPI;

  constructor() {
    this.ChatApi = new ChatAPI();
  }

  async createChat(title: string) {
    return this.ChatApi.create({ title });
  }

  async getChats() {
    return this.ChatApi.read({ limit: 9000 })
      .then((result) => {
        if (result.status === 200) {
          const responseData = JSON.parse(result.response);

          store.setState('chat.list', responseData);
        } else {
          const errorData = JSON.parse(result.response);
          console.error(
            'get chats error:',
            `${result.status} ${errorData.reason}`
          );
        }
      })
      .catch((err) => {
        if (err.message) {
          console.error('get chats error:', err.message);
        } else {
          console.error('get chats error:', 'Запрос прерван');
        }
      });
  }

  selectChat(id: number) {
    const chatList = (store.getState()?.chat?.list ?? []) as TChatData[];

    const chat = chatList.find((chatData) => {
      return chatData.id === id;
    });

    store.setState('chat.selected', { ...chat });
  }

  async getSingleChat(id: number) {
    if (!store.getState()?.chat?.list) {
      await this.getChats();
    }

    this.selectChat(id);
  }

  addUserToChat(userId: number, chatId: number) {
    return this.ChatApi.addUser({ users: [userId], chatId });
  }

  removeUserFromChat(userId: number, chatId: number) {
    return this.ChatApi.removeUser({ users: [userId], chatId });
  }

  onChatClick = (evt: Event, chatId: number) => {
    evt.preventDefault();

    // this.selectChat(chatId);

    RouterManagement.go(`/chats/${chatId}`);
  };

  onCreateChatButtonClick = async (evt: Event) => {
    evt.preventDefault();

    const chatName = prompt('Введите имя чата');

    if (chatName) {
      await this.createChat(chatName);

      await this.getChats();
    }
  };

  onAddUserButtonClick = (evt: Event) => {
    evt.preventDefault();

    const chatId = store.getState().chat.selected.id;

    const userId = prompt('Введите id пользователя');

    if (userId && chatId) {
      this.addUserToChat(Number(userId), chatId);
    }
  };

  onRemoveUserButtonClick = (evt: Event) => {
    evt.preventDefault();

    const chatId = store.getState().chat.selected.id;

    const userId = prompt('Введите id пользователя');

    if (userId && chatId) {
      this.removeUserFromChat(Number(userId), chatId);
    }
  };
}
