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
    let CurrentPage;

    switch (currentPageName) {
      case 'main': {
        CurrentPage = MainPage;
        break;
      }
      case 'auth': {
        CurrentPage = AuthPage;
        break;
      }
      case 'reg': {
        CurrentPage = RegPage;
        break;
      }
      case 'chats': {
        CurrentPage = ChatsPage;
        break;
      }
      case 'profile': {
        CurrentPage = ProfilePage;
        break;
      }
      case 'changePassword': {
        CurrentPage = ChangePasswordPage;
        break;
      }
      case '500': {
        CurrentPage = E500Page;
        break;
      }
      default: {
        CurrentPage = E404Page;
      }
    }

    appElement.append(new CurrentPage({}).getContent());
    // appElement.innerHTML = currentPage({});
  }
});
