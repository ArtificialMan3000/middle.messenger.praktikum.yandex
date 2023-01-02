import { IComponentConstructor } from '~/src/view/Component';
import { withAppLoader } from '../../hocs/withAppLoader';

export const withSignUpLoader = function withSignUpLoader<
  TProps extends Record<string, unknown>
>(ComponentClass: IComponentConstructor<TProps>) {
  return withAppLoader<TProps>(ComponentClass, 'signUp');
};
