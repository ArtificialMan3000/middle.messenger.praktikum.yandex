import tpl from './MainPage.hbs';
import { Component, TComponentProps } from '~src/view/Component';

type TProps = TComponentProps;

export class MainPage extends Component {
  constructor(props: TProps) {
    super(props, 'div');
  }

  render() {
    return this.compile(tpl, {});
  }
};
