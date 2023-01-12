import { connect } from '~/src/store/connect';
import { IComponentConstructor } from '~/src/view/Component';

export const withUserData = function withUserData<
  TProps extends Record<string, unknown>
>(ComponentClass: IComponentConstructor<TProps>) {
  return connect<TProps>((state) => {
    const userData = state.user?.data || null;
    return { userData };
  })(ComponentClass);
};
