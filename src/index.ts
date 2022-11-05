import { MainPage } from '~/src/pages/MainPage';
import { E404Page } from '~/src/pages/E404Page';
import { ChangePasswordPage } from '~/src/pages/ChangePasswordPage';
import { ChatsPage } from '~/src/pages/ChatsPage';
import { E500Page } from '~/src/pages/E500Page';
import { ProfilePage } from '~/src/pages/ProfilePage';
import { RegPage } from '~/src/pages/RegPage';
import { AuthPage } from '~/src/pages/AuthPage';

window.addEventListener('DOMContentLoaded', () => {
  const appElement = document.querySelector<HTMLElement>('#app');
  if (appElement) {
    const currentPageName = appElement.dataset.page;
    let currentPage;

    switch (currentPageName) {
      case 'main': {
        currentPage = MainPage;
        break;
      }
      case 'auth': {
        currentPage = AuthPage;
        break;
      }
      case 'reg': {
        currentPage = RegPage;
        break;
      }
      case 'chats': {
        currentPage = ChatsPage;
        break;
      }
      case 'profile': {
        currentPage = ProfilePage;
        break;
      }
      case 'changePassword': {
        currentPage = ChangePasswordPage;
        break;
      }
      case '500': {
        currentPage = E500Page;
        break;
      }
      default: {
        currentPage = E404Page;
      }
    }

    appElement.append(new ChatsPage({}).getContent());
    // appElement.innerHTML = currentPage({});
  }
});
