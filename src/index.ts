import { MainPage } from '~/src/pages/MainPage';
import { E404Page } from '~/src/pages/E404Page';
import { ChangePasswordPage } from '~/src/pages/ChangePasswordPage';
import { ChatsPage } from '~/src/pages/ChatsPage';
import { E500Page } from '~/src/pages/E500Page';
import { ProfilePage } from '~/src/pages/ProfilePage';
import { RegPage } from '~/src/pages/RegPage';
import { AuthPage } from '~/src/pages/AuthPage';
import { constructRouter, UserController } from '~/src/controller';
import './tests';
import { TComponentPropsType } from './typings/utils';

window.addEventListener('DOMContentLoaded', () => {
  const router = constructRouter();

  if (router) {
    router
      .use<TComponentPropsType<MainPage>>('/', MainPage, {})
      .use<TComponentPropsType<AuthPage>>('/auth', AuthPage, {})
      .use<TComponentPropsType<RegPage>>('/reg', RegPage, {})
      .use<TComponentPropsType<ProfilePage>>('/profile', ProfilePage, {})
      .use<TComponentPropsType<ChangePasswordPage>>(
        '/change-password',
        ChangePasswordPage,
        {}
      )
      .use<TComponentPropsType<ChatsPage>>('/chats/:id', ChatsPage, {})
      .use<TComponentPropsType<E500Page>>('/500', E500Page, {})
      .use<TComponentPropsType<E404Page>>('/404', E404Page, {})
      .default<TComponentPropsType<E404Page>>(E404Page, {})
      .start();
  }

  const userController = new UserController();

  userController.checkUser();
});
