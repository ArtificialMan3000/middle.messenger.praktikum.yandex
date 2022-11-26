import { MainPage } from '~/src/pages/MainPage';
import { E404Page } from '~/src/pages/E404Page';
import { ChangePasswordPage } from '~/src/pages/ChangePasswordPage';
import { ChatsPage } from '~/src/pages/ChatsPage';
import { E500Page } from '~/src/pages/E500Page';
import { ProfilePage } from '~/src/pages/ProfilePage';
import { RegPage } from '~/src/pages/RegPage';
import { AuthPage } from '~/src/pages/AuthPage';
import { getRouter } from './utils/Router';

window.addEventListener('DOMContentLoaded', () => {
  const router = getRouter('#app');

  if (router) {
    router
      .use<MainPage>('/', MainPage, {})
      .use<AuthPage>('/auth', AuthPage, {})
      .use<RegPage>('/reg', RegPage, {})
      .use<ProfilePage>('/profile', ProfilePage, {})
      .use<ChangePasswordPage>('/change-password', ChangePasswordPage, {})
      .use<ChatsPage>('/chats', ChatsPage, {})
      .use<E500Page>('/500', E500Page, {})
      .use<E404Page>('/404', E404Page, {})
      .default<E404Page>(E404Page, {})
      .start();
  }
});
