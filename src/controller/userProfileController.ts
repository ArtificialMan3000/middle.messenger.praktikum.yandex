import { UserProfileAPI } from '~/src/api/userProfileApi';
import { store } from '~/src/store';

export class UserController {
  UserProfileAPI: UserProfileAPI;

  constructor() {
    this.UserProfileAPI = new UserProfileAPI();
  }

  getUserProfile() {
    this.UserProfileAPI.read().then(() => {
      store.setState('user.profile.query.status', 'loaded');
    });
  }
}
