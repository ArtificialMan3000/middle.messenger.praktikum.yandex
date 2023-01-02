import { IComponentConstructor } from '~/src/view/Component';
import { withAppLoader } from '../../hocs/withAppLoader';

export const withSignInLoader = function withSignInLoader<
  TProps extends Record<string, unknown>
>(ComponentClass: IComponentConstructor<TProps>) {
  return withAppLoader<TProps>(ComponentClass, 'signIn');
};
