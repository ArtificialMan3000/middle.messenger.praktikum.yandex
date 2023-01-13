import { HTTPTransport, BaseAPI, myFetch } from '~/src/utils/HTTPTransport';

type TChatsAPIReadOptions = {
  limit?: number;
  offset?: number;
  title?: string;
};

const httpTransport = new HTTPTransport();

export class ChatAPI extends BaseAPI {
  static URL = 'https://ya-praktikum.tech/api/v2/chats';

  create() {
    return httpTransport.post(`${ChatAPI.URL}/`, {
      data: { title: 'string' },
    });
  }

  read(data: TChatsAPIReadOptions = {}) {
    return myFetch(`${ChatAPI.URL}/`, {
      method: 'GET',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    });
  }
}
