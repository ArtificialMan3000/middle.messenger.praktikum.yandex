import { MainPage } from '~/src/pages/MainPage';
import { E404Page } from '~/src/pages/E404Page';
import { ChangePasswordPage } from '~/src/pages/ChangePasswordPage';
import { ChatsPage } from '~/src/pages/ChatsPage';
import { E500Page } from '~/src/pages/E500Page';
import { ProfilePage } from '~/src/pages/ProfilePage';
import { RegPage } from '~/src/pages/RegPage';
import { AuthPage } from '~/src/pages/AuthPage';

window.addEventListener('DOMContentLoaded', () => {
  const appElem = document.querySelector('#app');
  const currentPageName = appElem.dataset.page;
  let currentPage;
  console.log(currentPageName);

  switch (currentPageName) {
    case 'main':
      currentPage = MainPage;
      break;
    case 'auth':
      currentPage = AuthPage;
      break;
    case 'reg':
      currentPage = RegPage;
      break;
    case 'chats':
      currentPage = ChatsPage;
      break;
    case 'profile':
      currentPage = ProfilePage;
      break;
    case 'changePassword':
      currentPage = ChangePasswordPage;
      break;
    case '500':
      currentPage = E500Page;
      break;
    default:
      currentPage = E404Page;
  }

  appElem.innerHTML = currentPage();
});
