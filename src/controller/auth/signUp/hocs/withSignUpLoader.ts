import { IComponentConstructor } from '~/src/view/Component';
import { withLoader } from '../../hocs/withLoader';

export const withSignUpLoader = function withSignUpLoader<
  TProps extends Record<string, unknown>
>(ComponentClass: IComponentConstructor<TProps>) {
  return withLoader<TProps>(ComponentClass, 'signUp');
};
