import tpl from './Backlink.hbs';
import * as css from './Backlink.module.scss';
import {
  Component,
  extendClassName,
  TComponentProps,
} from '~/src/view/Component';
import { Link } from '../Link';

type TBacklinkProps = {
  location: string;
  text: string;
};

export class Backlink extends Component<TBacklinkProps> {
  constructor(props: TComponentProps<TBacklinkProps>) {
    const className = extendClassName(css.link, props.className);
    super({ ...props, className });
  }

  render() {
    const { text, location } = this.props;
    return this.compile(tpl, { Link: new Link({ location, text }), css });
  }
}
