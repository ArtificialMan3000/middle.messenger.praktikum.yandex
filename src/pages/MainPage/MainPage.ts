import tpl from './MainPage.hbs';
import { Component, TComponentProps } from '~/src/view/Component';

type TProps = TComponentProps;

export class MainPage extends Component<TProps> {
  constructor(props: TProps) {
    super(props, 'main');
  }

  render() {
    return this.compile(tpl, this.props);
  }
};
