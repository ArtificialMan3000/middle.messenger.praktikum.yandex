import tpl from './AuthPage.hbs';
import * as css from './AuthPage.module.scss';
import { AuthForm } from '~/src/components/forms/AuthForm';
import { Window } from '~/src/components/Window';
import { Component, TComponentProps } from '~/src/view/Component';
import { Page } from '../Page';
import { UserController } from '~/src/controller';

const userController = new UserController();

export class AuthPage extends Component {
  constructor(props: TComponentProps) {
    super(props, 'main');
  }

  init() {
    userController.checkUser();

    super.init();
  }

  render() {
    return this.compile(tpl, {
      css,
      Page: new Page(
        {
          children: new Window({
            header: 'Авторизация',
            content: new AuthForm({}),
          }),
        },
        'div'
      ),
    });
  }
}
