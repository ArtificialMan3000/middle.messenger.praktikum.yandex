import { IComponentConstructor } from '~/src/view/Component';
import { withError } from '../../hocs/withError';

export const withSignUpError = function withSignUpError<
  TProps extends Record<string, unknown>
>(ComponentClass: IComponentConstructor<TProps>) {
  return withError<TProps>(ComponentClass, 'signUp');
};
