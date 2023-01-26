import css from './ButtonLink.module.scss';
import type { TComponentPropsType } from '~/src/typings/utils';
import { Link } from '~/src/components/Link';

type TButtonLinkProps = TComponentPropsType<Link>;

export function ButtonLink(props: TButtonLinkProps) {
  return new Link({ ...props, className: `${props.className} ${css.button}` });
}
