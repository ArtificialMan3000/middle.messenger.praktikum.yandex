import { BaseAPI, myFetch } from '~/src/utils/HTTPTransport';

type TReadChatsRequest = {
  limit?: number;
  offset?: number;
  title?: string;
};

type TCreateChatRequest = {
  title: string;
};

type TDeleteChatRequest = {
  chatId: number;
};

type TAddUserRequest = {
  users: number[];
  chatId: number;
};

type TRemoveUserRequest = TAddUserRequest;

export class ChatAPI extends BaseAPI {
  static URL = `${BaseAPI.BASE_URL}/chats`;

  create(data: TCreateChatRequest) {
    return myFetch(`${ChatAPI.URL}/`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  delete(data: TDeleteChatRequest) {
    return myFetch(`${ChatAPI.URL}/`, {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  read(data: TReadChatsRequest = {}) {
    return myFetch(`${ChatAPI.URL}/`, {
      method: 'GET',
      body: data,
    });
  }

  addUser(data: TAddUserRequest) {
    return myFetch(`${ChatAPI.URL}/users`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  removeUser(data: TRemoveUserRequest) {
    return myFetch(`${ChatAPI.URL}/users`, {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  getToken(chatId: number) {
    return myFetch(`${ChatAPI.URL}/token/${chatId}`, {
      method: 'POST',
    });
  }
}
