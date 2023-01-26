import tpl from './RegPage.hbs';
import { RegForm } from '~/src/components/forms/RegForm';
import { Window } from '~/src/components/Window';
import { Component } from '~/src/view/Component';
import { Page } from '../Page';
import { UserController } from '~/src/controller';

const userController = new UserController();

export class RegPage extends Component {
  init() {
    userController.checkUser();

    super.init();
  }

  render() {
    return this.compile(tpl, {
      Page: new Page({
        children: new Window({
          header: 'Регистрация',
          content: new RegForm({}),
        }),
      }),
    });
  }
}
