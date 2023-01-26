import { MainPage } from '~/src/pages/MainPage';
import { E404Page } from '~/src/pages/E404Page';
import { ChangePasswordPage } from '~/src/pages/ChangePasswordPage';
import { ChatsPage } from '~/src/pages/ChatsPage';
import { E500Page } from '~/src/pages/E500Page';
import { ProfilePage } from '~/src/pages/ProfilePage';
import { RegPage } from '~/src/pages/RegPage';
import { AuthPage } from '~/src/pages/AuthPage';
import RouterManagement, {
  RouteTypes,
} from '~/src/controller/RouterManagement';
import { TComponentPropsType } from './typings/utils';
import './style.scss';

const ROUTES = {
  MAIN: {
    path: '/',
    type: RouteTypes.COMMON,
  },
  AUTH: {
    path: '/auth',
    type: RouteTypes.GUEST,
  },
  REG: { path: '/sign-up', type: RouteTypes.GUEST },
  PROFILE: { path: '/settings', type: RouteTypes.PRIVATE },
  CHANGE_PASSWORD: { path: '/change-password', type: RouteTypes.PRIVATE },
  CHAT: { path: '/messenger/:id', type: RouteTypes.PRIVATE },
  CHATS: { path: '/messenger', type: RouteTypes.PRIVATE },
  E500: { path: '/500', type: RouteTypes.COMMON },
  E404: { path: '/404', type: RouteTypes.COMMON },
};

window.addEventListener('DOMContentLoaded', () => {
  RouterManagement.use<TComponentPropsType<MainPage>>(
    ROUTES.MAIN.path,
    MainPage,
    {}
  )
    .use<TComponentPropsType<AuthPage>>(
      ROUTES.AUTH.path,
      AuthPage,
      {},
      ROUTES.AUTH.type,
      true
    )
    .use<TComponentPropsType<RegPage>>(
      ROUTES.REG.path,
      RegPage,
      {},
      ROUTES.REG.type
    )
    .use<TComponentPropsType<ProfilePage>>(
      ROUTES.PROFILE.path,
      ProfilePage,
      {},
      ROUTES.PROFILE.type,
      true
    )
    .use<TComponentPropsType<ChangePasswordPage>>(
      ROUTES.CHANGE_PASSWORD.path,
      ChangePasswordPage,
      {},
      ROUTES.CHANGE_PASSWORD.type
    )
    .use<TComponentPropsType<ChatsPage>>(
      ROUTES.CHAT.path,
      ChatsPage,
      {},
      ROUTES.CHAT.type
    )
    .use<TComponentPropsType<ChatsPage>>(
      ROUTES.CHATS.path,
      ChatsPage,
      {},
      ROUTES.CHATS.type
    )
    .use<TComponentPropsType<E500Page>>(ROUTES.E500.path, E500Page, {})
    .use<TComponentPropsType<E404Page>>(ROUTES.E404.path, E404Page, {})
    .default<TComponentPropsType<E404Page>>(E404Page, {})
    .start();
});
