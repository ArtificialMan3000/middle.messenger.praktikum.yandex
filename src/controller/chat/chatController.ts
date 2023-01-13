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

  getChats() {
    this.ChatApi.read()
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
}
