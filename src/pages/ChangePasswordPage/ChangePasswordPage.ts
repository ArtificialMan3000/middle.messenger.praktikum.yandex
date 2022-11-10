import tpl from './ChangePasswordPage.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import { Backlink } from '~/src/components/Backlink';
import { ChangePasswordForm } from '~/src/components/ChangePasswordForm';
import { Window } from '~/src/components/Window';
import {
  Component,
  TComponentProps,
  extendClassName,
} from '~src/view/Component';

type TProps = TComponentProps;
export class ChangePasswordPage extends Component {
  constructor(props: TProps) {
    const className = extendClassName(sharedCss.siteWrapper, props.className);
    super({ ...props, className }, 'div');
  }

  render() {
    return this.compile(tpl, {
      Window: new Window({
        header: 'Сменить пароль',
        content: new ChangePasswordForm({}),
        errorText: 'Сообщение об ошибке',
      }),
      Backlink: new Backlink({
        text: 'К чатам',
        attr: {
          href: 'chats.html',
        },
      }),
      css: sharedCss,
    });
  }
}
