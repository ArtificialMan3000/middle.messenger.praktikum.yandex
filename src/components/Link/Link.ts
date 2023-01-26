import tpl from './Link.hbs';
import { Component, TComponentProps } from '~/src/view/Component';
import { set } from '~/src/utils/functions';
import RouterManagement from '~/src/controller/RouterManagement';

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
        evt.preventDefault();
        RouterManagement.go(this.props.location);
      }
    };

    this._registerEvent('click', clickHandler);

    super._addEvents();
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
