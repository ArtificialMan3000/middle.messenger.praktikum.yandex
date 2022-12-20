import { TQueryType } from '../types';
import { connect } from '~/src/store/connect';
import { IComponentConstructor } from '~/src/view/Component';

export const withLoader = function withLoader<
  TProps extends Record<string, unknown>
>(ComponentClass: IComponentConstructor<TProps>, queryType: TQueryType) {
  return connect<TProps>((state) => {
    const isLoading = state.user?.[queryType]?.query?.isLoading || false;
    return { loader: isLoading };
  })(ComponentClass);
};
