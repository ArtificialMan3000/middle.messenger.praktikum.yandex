import { BaseAPI, myFetch } from '~/src/utils/HTTPTransport';

// const httpTransport = new HTTPTransport();

export type TSignUpModel = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export class UserAuthAPI extends BaseAPI {
  static URL = 'https://ya-praktikum.tech/api/v2/auth';

  signUp(data: TSignUpModel) {
    return myFetch(`${UserAuthAPI.URL}/signup`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json', // Данные отправляем в формате JSON
      },
    });
  }
}
