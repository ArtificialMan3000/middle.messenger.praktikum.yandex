import { messagesController } from '~/src/controller/messages';
import { AuthAPI } from '~/src/api/authApi';
import { store } from '~/src/store';
import RouterManagement from '../RouterManagement';

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

  async checkUser() {
    store.setState('app.isLoading', true);

    // store.setState('user.isSignedIn', false);
    // store.setState('user.data', null);
    await this.AuthAPI.getUser()
      .then((result) => {
        if (result.status === 200) {
          const responseData: TUserData = JSON.parse(result.response);
          store.setState('app.isPrivate', true);
          store.setState('user.isSignedIn', true);
          store.setState('user.data', responseData);
        } else {
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

  logout() {
    store.setState('user.logout.query.error', null);

    this.AuthAPI.logout()
      .then((result) => {
        if (result.status === 200) {
          store.setState('app.isPrivate', false);
          store.setState('user.isSignedIn', false);
          store.setState('user.data', null);

          messagesController.closeAll();

          RouterManagement.go('/auth');
        } else {
          store.setState('user.logout.query.error', 'Неизвестная ошибка');
        }
      })
      .catch(() => {
        store.setState('user.logout.query.error', 'Запрос прерван');
      });
  }

  onLogoutButtonClick(evt: Event) {
    evt.preventDefault();

    this.logout();
  }
}
