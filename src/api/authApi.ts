import { BaseAPI, myFetch } from '~/src/utils/HTTPTransport';

// const httpTransport = new HTTPTransport();

export type TSignUpRequest = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type TSignInRequest = {
  login: string;
  password: string;
};

export class AuthAPI extends BaseAPI {
  static URL = `${BaseAPI.BASE_URL}/auth`;

  signUp(data: TSignUpRequest) {
    return myFetch(`${AuthAPI.URL}/signup`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json', // Данные отправляем в формате JSON
      },
    });
  }

  signIn(data: TSignInRequest) {
    const res = myFetch(`${AuthAPI.URL}/signin`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json', // Данные отправляем в формате JSON
      },
    });
    return res;
  }

  async getUser() {
    return myFetch(`${AuthAPI.URL}/user`);
  }

  logout() {
    return myFetch(`${AuthAPI.URL}/logout`, { method: 'POST' });
  }
}
