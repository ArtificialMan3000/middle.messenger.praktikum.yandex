import { BaseAPI, myFetch } from '~/src/utils/HTTPTransport';

// const httpTransport = new HTTPTransport();

export type TChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type TChangeProfileRequest = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export class UserAPI extends BaseAPI {
  static URL = 'https://ya-praktikum.tech/api/v2/user';

  changePassword(data: TChangePasswordRequest) {
    return myFetch(`${UserAPI.URL}/password`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json', // Данные отправляем в формате JSON
      },
    });
  }

  changeProfile(data: TChangeProfileRequest) {
    return myFetch(`${UserAPI.URL}/profile`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json', // Данные отправляем в формате JSON
      },
    });
  }

  getUser() {
    return myFetch(`${UserAPI.URL}/user`);
  }
}
