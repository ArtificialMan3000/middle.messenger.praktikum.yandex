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
    return this.ChatApi.read({ limit: 9000, offset: 0 })
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

  onCreateChatButtonClick = async (evt: Event) => {
    evt.preventDefault();

    const chatName = prompt('Введите имя чата');

    if (chatName) {
      await this.createChat(chatName);

      await this.getChats();
    }
  };
}
