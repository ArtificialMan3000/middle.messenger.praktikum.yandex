import { connect } from '~/src/store/connect';
import { IComponentConstructor } from '~/src/view/Component';
import { TQueryType } from './types';

export const withMessage = function withMessage<
  TProps extends Record<string, unknown>
>(ComponentClass: IComponentConstructor<TProps>, queryType: TQueryType) {
  return connect<TProps>((state) => {
    const isLoading = state.user?.[queryType]?.query?.isLoading || null;
    const message = state.user?.[queryType]?.message || null;

    let resultMessage = '';
    if (isLoading) {
      resultMessage = 'Отправка данных...';
    } else if (message) {
      resultMessage = message;
    }
    return { message: resultMessage };
  })(ComponentClass);
};
