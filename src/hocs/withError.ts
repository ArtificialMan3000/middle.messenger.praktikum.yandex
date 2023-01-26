import { connect } from '~/src/store/connect';
import { IComponentConstructor } from '~/src/view/Component';
import { TQueryType } from './types';

export const withError = function withError<
  TProps extends Record<string, unknown>
>(ComponentClass: IComponentConstructor<TProps>, queryType: TQueryType) {
  return connect<TProps>((state) => {
    const error = state.user?.[queryType]?.query?.error || null;
    return { errorText: error };
  })(ComponentClass);
};
