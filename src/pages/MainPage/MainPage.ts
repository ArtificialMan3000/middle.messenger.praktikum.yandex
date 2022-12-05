import tpl from './MainPage.hbs';
import { Component, TComponentProps } from '~/src/view/Component';
import { Link } from '~/src/components/Link';

const PAGES_INFO = [
  {
    name: 'Авторизация',
    link: '/auth',
  },
  {
    name: 'Регистрация',
    link: '/reg',
  },
  {
    name: 'Чаты',
    link: '/chats',
  },
  {
    name: 'Профиль',
    link: '/profile',
  },
  {
    name: 'Смена пароля',
    link: '/change-password',
  },
  {
    name: 'Страница 404',
    link: '/404',
  },
  {
    name: 'Страница 500',
    link: '/500',
  },
];

export type TProps = Record<string, never>;

export class MainPage extends Component {
  pageLinks: Component[];

  constructor(props: TComponentProps) {
    super(props, 'main');
  }

  render() {
    this.pageLinks = PAGES_INFO.map(({ name, link }) => {
      return new Link({ text: name, location: link });
    });
    return this.compile(tpl, { ...this.props, pageLinks: this.pageLinks });
  }
};
