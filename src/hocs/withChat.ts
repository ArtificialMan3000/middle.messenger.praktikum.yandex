import { connect } from '../store/connect';
import { IComponentConstructor } from '../view/Component';

export const withChat = function withChat(
  ComponentClass: IComponentConstructor
) {
  return connect((state) => {
    const chatData = state.chat?.selected ?? {};
    return { chatData: { ...chatData } };
  })(ComponentClass);
};
