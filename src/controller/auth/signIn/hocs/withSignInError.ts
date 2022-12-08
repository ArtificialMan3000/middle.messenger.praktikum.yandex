import { IComponentConstructor } from '~/src/view/Component';
import { withError } from '../../hocs/withError';

export const withSignInError = function withSignInError<
  TProps extends Record<string, unknown>
>(ComponentClass: IComponentConstructor<TProps>) {
  return withError<TProps>(ComponentClass, 'signIn');
};
