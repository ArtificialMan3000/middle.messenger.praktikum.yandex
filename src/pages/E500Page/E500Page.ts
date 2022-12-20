import tpl from './E500Page.hbs';
import contentTpl from './E500PageContent.hbs';
import * as css from './E500.module.scss';
import * as sharedCss from '~/src/scss/shared.module.scss';
import { Component } from '~/src/view/Component';
import { Link } from '~/src/components/Link';
import { Page } from '~/src/view/ui/Page';
import { makeClassNames, wrapper } from '~/src/view/View';

export class E500Page extends Component {
  render() {
    return this.compile(tpl, {
      Page: new Page({
        children: wrapper(contentTpl, {
          css,
          className: makeClassNames(css.container, sharedCss.dangerBg),
          ToChatLink: new Link({
            href: '/chats',
            text: 'Убежать',
            className: css.backlink,
          }),
        }),
      }),
    });
  }
};
