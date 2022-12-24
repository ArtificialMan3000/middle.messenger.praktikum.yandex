import tpl from './RegPage.hbs';
import * as css from './RegPage.module.scss';
import { RegForm } from '~/src/components/forms/RegForm';
import { Window } from '~/src/components/Window';
import { Component } from '~/src/view/Component';
import { Page } from '~/src/view/ui/Page';

export class RegPage extends Component {
  render() {
    return this.compile(tpl, {
      Page: new Page({
        css,
        children: new Window({
          header: 'Регистрация',
          content: new RegForm({}),
        }),
      }),
    });
  }
}
