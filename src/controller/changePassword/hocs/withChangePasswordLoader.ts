import { IComponentConstructor } from '~/src/view/Component';
import { withLoader } from '../../hocs/withLoader';

export const withChangePasswordLoader = function withSignInLoader<
  TProps extends Record<string, unknown>
>(ComponentClass: IComponentConstructor<TProps>) {
  return withLoader<TProps>(ComponentClass, 'changePassword');
};
