import { MessagesAPI, TMessageResponse } from '~/src/api/messagesApi';
import { ChatAPI } from '~/src/api/chatApi';
import { store } from '~/src/store';
import { WSTransport } from '~/src/utils/WSTransport';
import { validateForm } from '../fieldValidation';
import { markInvalid, markValid } from '~/src/view/View';

export type TChatMessage = {
  id?: string;
  chat_id?: number;
  time: string;
  type: string;
  user_id: string;
  content: string;
};

class MessagesController {
  ChatApi: ChatAPI;

  MessagesApi: MessagesAPI;

  connects: Record<number, WSTransport> = {};

  constructor() {
    this.ChatApi = new ChatAPI();
    this.MessagesApi = new MessagesAPI();
  }

  async connect(chatId: number) {
    if (!this.connects[chatId]) {
      const tokenResult = await this.ChatApi.getToken(chatId);
      const { token } = JSON.parse(tokenResult.response);

      const userId = store.getState().user?.data?.id;

      if (userId) {
        const connect = await this.MessagesApi.connect(userId, chatId, token, {
          onmessage: (message) => this.onReceiveMessage(chatId, message),
          onclose: () => this.onCloseConnection(chatId),
        });

        this.connects[chatId] = connect;
      }
    }
  }

  getConnect(id: number) {
    const connect = this.connects[id];
    if (!connect) {
      throw new Error('Соединение ещё не установлено');
    }
    return connect;
  }

  getMessages(chatId: number) {
    const connect = this.getConnect(chatId);

    connect.send({ content: '0', type: 'get old' });
  }

  sendMessage(chatId: number, message: string) {
    const connect = this.getConnect(chatId);

    connect.send({ type: 'message', content: message });
  }

  closeAll() {
    Object.values(this.connects).forEach((connect) => {
      connect.close();
    });
  }

  onCloseConnection = (chatId: number) => {
    delete this.connects[chatId];
  };

  onReceiveMessage = (chatId: number, message: TMessageResponse) => {
    const currMessages = store.getState().messages?.[chatId] ?? [];

    if (Array.isArray(message)) {
      store.setState(`messages.${chatId}`, [...message.reverse()]);
    } else if (message.type === 'message') {
      store.setState(`messages.${chatId}`, [...currMessages, message]);
    }
  };

  onMessagesFormSubmit = (evt: Event, chatId: number | undefined) => {
    evt.preventDefault();

    if (!chatId) {
      return;
    }

    const form = evt.target as HTMLFormElement;
    const formData = new FormData(form);

    const { invalids, valids } = validateForm(formData, ['message']);

    if (invalids.length > 0) {
      invalids.forEach((invalidField) => {
        const invalidInput = form.querySelector<HTMLInputElement>(
          `[name=${invalidField}]`
        );
        if (invalidInput) {
          markInvalid(invalidInput);
        }
      });
    }

    if (valids.length > 0) {
      valids.forEach((invalidField) => {
        const validInput = form.querySelector<HTMLInputElement>(
          `[name=${invalidField}]`
        );
        if (validInput) {
          markValid(validInput);
        }
      });
    }

    if (invalids.length === 0) {
      const message = formData.get('message');

      if (typeof message === 'string') {
        this.sendMessage(chatId, message);
      }
    }
  };
}

export const messagesController = new MessagesController();
