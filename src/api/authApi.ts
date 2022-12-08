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
  static URL = 'https://ya-praktikum.tech/api/v2/auth';

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
    return myFetch(`${AuthAPI.URL}/signin`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json', // Данные отправляем в формате JSON
      },
    });
  }

  getUser() {
    return myFetch(`${AuthAPI.URL}/user`);
  }
}
