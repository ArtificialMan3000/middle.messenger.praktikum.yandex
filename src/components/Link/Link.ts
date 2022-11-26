import tpl from './Link.hbs';
import { getRouter } from '~/src/utils/Router';
import { Component, TComponentProps } from '~/src/view/Component';
import { set } from '~/src/utils/functions';

type TLinkProps = TComponentProps & {
  location?: string;
  text: string;
};

export class Link extends Component<TLinkProps> {
  constructor(props: TLinkProps) {
    const preparedProps = props;
    if (props.location) {
      set(preparedProps, 'attr.href', props.location);
    }
    super(preparedProps, 'a');
  }

  _addEvents() {
    const clickHandler = (evt: MouseEvent) => {
      if (this.props.location) {
        const router = getRouter();
        if (router) {
          evt.preventDefault();
          router.go(this.props.location);
        }
      }
    };

    this._registerEvent('click', clickHandler);

    super._addEvents();
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
