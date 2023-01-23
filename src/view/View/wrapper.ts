import { TemplateDelegate } from 'handlebars';
import { Component } from '../Component';

export function wrapper(
  tpl: TemplateDelegate,
  props: Record<string, unknown>,
  tag = 'div'
) {
  return new (class Wrapper extends Component {
    render() {
      return this.compile(tpl, this.props);
    }
  })(props, tag);
}
