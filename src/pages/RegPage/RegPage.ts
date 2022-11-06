import tpl from './RegPage.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import * as css from './RegPage.module.scss';
import { RegForm } from '~/src/components/RegForm';
import { Window } from '~/src/components/Window';
import {
  Component,
  extendClassName,
  getComponentAsHTML,
  TComponentProps,
} from '~src/view/Component';

Object.assign(css, sharedCss);

type TProps = TComponentProps;

export class RegPage extends Component {
  constructor(props: TProps) {
    const className = extendClassName(sharedCss.siteWrapper, props.className);
    super({ ...props, className }, 'div');
  }

  render() {
    return tpl({
      Window: getComponentAsHTML(
        new Window({
          header: 'Регистрация',
          content: getComponentAsHTML(new RegForm()),
        })
      ),
      css,
    });
  }
};
