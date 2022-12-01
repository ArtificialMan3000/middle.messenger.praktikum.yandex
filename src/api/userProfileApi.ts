import { BaseAPI, HTTPTransport } from '~/src/utils/HTTPTransport';

const httpTransport = new HTTPTransport();

export class UserProfileAPI extends BaseAPI {
  static URL: 'api/v1/user';

  read() {
    return new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
  }
}
