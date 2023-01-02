import tpl from './ChangePasswordPage.hbs';
import contentTpl from './ChangePasswordPageContent.hbs';
import * as css from './ChangePassword.module.scss';
import { Backlink } from '~/src/components/Backlink';
import { ChangePasswordForm } from '~/src/components/forms/ChangePasswordForm';
import { Window } from '~/src/components/Window';
import { Component, TComponentProps } from '~/src/view/Component';
import { Page } from '../Page';
import { wrapper } from '~/src/view/View';

export class ChangePasswordPage extends Component {
  constructor(props: TComponentProps) {
    super(props, 'main');
  }

  render() {
    return this.compile(tpl, {
      css,
      Page: new Page(
        {
          children: wrapper(contentTpl, {
            className: css.container,
            Window: new Window({
              className: css.window,
              header: 'Сменить пароль',
              content: new ChangePasswordForm({}),
              errorText: 'Сообщение об ошибке',
            }),
            Backlink: new Backlink({
              text: 'К чатам',
              location: '/chats',
            }),
          }),
        },
        'div'
      ),
    });
  }
}
