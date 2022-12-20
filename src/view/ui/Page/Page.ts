import tpl from './Page.hbs';
import * as css from './Page.module.scss';
import { Component, TComponentProps } from '~/src/view/Component';
import { LoaderPlug } from '../LoaderPlug';

type TProps = { isLoaderDisplayed?: boolean };

export class Page extends Component<TProps> {
  constructor(props: TComponentProps<TProps>, tag = 'main') {
    super(props, tag);
  }

  render() {
    const { isLoaderDisplayed = false, children = '' } = this.props;

    return this.compile(tpl, {
      css,
      isLoaderDisplayed,
      LoaderPlug: new LoaderPlug({ className: css.loaderScreen }),
      children,
    });
  }
}
