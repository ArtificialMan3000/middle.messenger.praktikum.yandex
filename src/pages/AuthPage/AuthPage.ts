import tpl from './AuthPage.hbs';
import * as css from './AuthPage.module.scss';
import { AuthForm } from '~/src/components/forms/AuthForm';
import { Window } from '~/src/components/Window';
import { Component, TComponentProps } from '~/src/view/Component';
import { Page } from '~/src/view/ui/Page';


export class AuthPage extends Component {
  constructor(props: TComponentProps) {
    super(props, 'main');
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
