import { IComponentConstructor } from '~/src/view/Component';
import { withError } from '../../hocs/withError';

export const withProfileError = function withSignInError<
  TProps extends Record<string, unknown>
>(ComponentClass: IComponentConstructor<TProps>) {
  return withError<TProps>(ComponentClass, 'profile');
};
