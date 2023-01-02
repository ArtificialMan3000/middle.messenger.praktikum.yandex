import { connect } from '~/src/store/connect';
import { IComponentConstructor } from '~/src/view/Component';

export const withAppLoader = function withAppLoader<
  TProps extends Record<string, unknown>
>(ComponentClass: IComponentConstructor<TProps>) {
  return connect<TProps>((state) => {
    const isLoading = Boolean(state.app?.isLoading);
    return { isLoaderDisplayed: isLoading };
  })(ComponentClass);
};
