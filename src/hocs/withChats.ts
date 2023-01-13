import { connect } from '../store/connect';
import { IComponentConstructor } from '../view/Component';

export const withChats = function withChats(
  ComponentClass: IComponentConstructor
) {
  return connect((state) => {
    const chatsData = state.chat?.list;
    return { chatsData };
  })(ComponentClass);
};
