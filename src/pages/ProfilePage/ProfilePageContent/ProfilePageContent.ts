import tpl from './ProfilePageContent.hbs';
import { Component } from '~/src/view/Component';
import type { TCssModule } from '~/src/view/View';

type TProps = {
  css: TCssModule;
  Window: Component;
  FullAvatar: Component;
};

export class ProfilePageContent extends Component<TProps> {
  render() {
    const { css, Window, FullAvatar } = this.props;
    return this.compile(tpl, {
      css,
      Window,
      FullAvatar,
    });
  }
}
