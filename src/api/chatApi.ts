import { HTTPTransport, BaseAPI, myFetch } from '~/src/utils/HTTPTransport';

type TReadChatsRequest = {
  limit?: number;
  offset?: number;
  title?: string;
};

type TCreateChatRequest = {
  title: string;
};

const httpTransport = new HTTPTransport();

export class ChatAPI extends BaseAPI {
  static URL = 'https://ya-praktikum.tech/api/v2/chats';

  create(data: TCreateChatRequest) {
    return myFetch(`${ChatAPI.URL}/`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  read(data: TReadChatsRequest = {}) {
    return myFetch(`${ChatAPI.URL}/`, {
      method: 'GET',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    });
  }
}
