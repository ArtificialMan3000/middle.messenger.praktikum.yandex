import tpl from './AuthPage.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import { AuthForm } from '~/src/components/AuthForm';
import { Window } from '~/src/components/Window';
import {
  Component,
  extendClassName,
  getComponentAsHTML,
  TComponentProps,
} from '~src/view/Component';

type TProps = TComponentProps;

export class AuthPage extends Component {
  constructor(props: TProps) {
    const className = extendClassName(sharedCss.siteWrapper, props.className);
    super({ ...props, className }, 'div');
  }

  render() {
    return tpl({
      Window: getComponentAsHTML(
        new Window({
          header: 'Авторизация',
          content: getComponentAsHTML(new AuthForm()),
        })
      ),
      css: sharedCss,
    });
  }
}
