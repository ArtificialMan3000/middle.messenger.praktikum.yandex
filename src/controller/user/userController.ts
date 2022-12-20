import { constructRouter, Router } from '~/src/controller';
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

  router: Router;

  constructor() {
    this.AuthAPI = new AuthAPI();
    this.router = constructRouter();
  }

  checkUser() {
    store.setState('user.isSignedIn', false);
    store.setState('user.data', null);
    this.AuthAPI.getUser()
      .then((result) => {
        if (result.status === 200) {
          const responseData: TUserData = JSON.parse(result.response);
          store.setState('user.isSignedIn', true);
          store.setState('user.data', responseData);
        } else {
          this.router.go('/auth');
        }
      })
      .catch(() => {
        this.router.go('/auth');
      });
  }
}
