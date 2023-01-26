import tpl from './E404Page.hbs';
import contentTpl from './E404PageContent.hbs';
import * as css from './E404.module.scss';
import { Component } from '~/src/view/Component';
import { Link } from '~/src/components/Link';
import { Page } from '~/src/view/ui/Page';
import { wrapper } from '~/src/view/View';

export class E404Page extends Component {
  render() {
    return this.compile(tpl, {
      Page: new Page({
        children: wrapper(contentTpl, {
          css,
          className: css.container,
          ToChatLink: new Link({
            location: '/messenger',
            text: 'Вернуться к чатам',
            className: css.backlink,
          }),
        }),
      }),
    });
  }
}
