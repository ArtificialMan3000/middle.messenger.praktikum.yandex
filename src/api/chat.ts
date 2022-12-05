import { HTTPTransport, BaseAPI } from '~/src/utils/HTTPTransport';

type TChatsAPIReadOptions = {
  limit?: number;
  offset?: number;
  filter?: string;
};

const httpTransport = new HTTPTransport();

class ChatAPI extends BaseAPI {
  static URL: 'api/v1/chats';

  create() {
    return httpTransport.post(`${ChatAPI.URL}/`, {
      data: { title: 'string' },
    });
  }

  read({ limit, offset, filter }: TChatsAPIReadOptions) {
    return httpTransport.get(`${ChatAPI.URL}`, {
      data: { limit, offset, title: filter },
    });
  }
}
