import { connect } from '~/src/store/connect';
import { TState } from '~/src/store/types';
import { TClass } from '~/src/typings/utils';
import {
  Component,
  IComponentConstructor,
  TComponentChildren,
  TComponentProps,
  TEventsMap,
} from '~/src/view/Component';

function mapStateToProps(state: TState) {
  const queryStatus = state.user?.signUp?.query?.status || 'idle';
  let result: Record<string, unknown>;
  if (queryStatus === 'loading') {
    result = { className: 'sadasd' };
  }
  result = { className: 'sadasd' };
  return result;
}

export const withLoader = function <TProps extends Record<string, unknown>>(
  ComponentClass: IComponentConstructor<TProps>
) {
  return connect<TProps>((state) => {
    const queryStatus = state.user?.signUp?.query?.status || 'idle';
    if (queryStatus === 'loading') {
      return { loader: true };
    }
    return { loader: false };
  })(ComponentClass);
};
