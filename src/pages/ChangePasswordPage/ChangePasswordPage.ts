import tpl from './ChangePasswordPage.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import { Backlink } from '~/src/components/Backlink';
import { ChangePasswordForm } from '~/src/components/ChangePasswordForm';
import { Window } from '~/src/components/Window';
import {
  Component,
  TComponentProps,
  extendClassName,
  getComponentAsHTML,
} from '~src/view/Component';

// const window1 = new Window({
//   header: 'Сменить пароль',
//   children: ChangePasswordForm,
//   errorText: 'Сообщение об ошибке',
// });
// window.window1 = window1;

type TProps = TComponentProps;
export class ChangePasswordPage extends Component {
  constructor(props: TProps) {
    const className = extendClassName(sharedCss.siteWrapper, props.className);
    super({ ...props, className }, 'div');
  }

  render() {
    return tpl({
      Window: getComponentAsHTML(
        new Window({
          header: 'Сменить пароль',
          content: getComponentAsHTML(new ChangePasswordForm()),
          errorText: 'Сообщение об ошибке',
        })
      ),
      Backlink: getComponentAsHTML(
        new Backlink({
          text: 'К чатам',
          attr: {
            href: 'chats.html',
          },
        })
      ),
      css: sharedCss,
    });
  }
}
