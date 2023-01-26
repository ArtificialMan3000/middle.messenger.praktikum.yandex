import tpl from './Backlink.hbs';
import css from './Backlink.module.scss';
import { Component, TComponentProps } from '~/src/view/Component';
import { Link } from '../Link';
import { makeClassNames } from '~/src/view/View';

type TBacklinkProps = {
  location: string;
  text: string;
};

export class Backlink extends Component<TBacklinkProps> {
  constructor(props: TComponentProps<TBacklinkProps>) {
    const className = makeClassNames(css.link, props.className);
    super({ ...props, className });
  }

  render() {
    const { text, location } = this.props;
    return this.compile(tpl, { Link: new Link({ location, text }), css });
  }
}
