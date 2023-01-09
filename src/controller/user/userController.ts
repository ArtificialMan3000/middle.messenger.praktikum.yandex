import { AuthAPI } from '~/src/api/authApi';
import { store } from '~/src/store';

export type TUserData = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export class UserController {
  AuthAPI: AuthAPI;

  USER_FIELDS: string[];

  constructor() {
    this.AuthAPI = new AuthAPI();
  }

  checkUser() {
    store.setState('app.isLoading', true);

    // store.setState('user.isSignedIn', false);
    // store.setState('user.data', null);
    this.AuthAPI.getUser()
      .then((result) => {
        if (result.status === 200) {
          const responseData: TUserData = JSON.parse(result.response);
          store.setState('app.isPrivate', true);
          store.setState('user.isSignedIn', true);
          store.setState('user.data', responseData);
        } else {
          console.log('getUser');
          store.setState('app.isPrivate', false);
          store.setState('app.isLoading', false);

          const errorData = JSON.parse(result.response);
          throw new Error(`Status ${result.status} ${errorData.reason}`);
        }
      })
      .catch(() => {
        store.setState('app.isPrivate', false);
      })
      .finally(() => {
        store.setState('app.isLoading', false);
      });
  }
}
