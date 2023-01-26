import { connect } from '../store/connect';
import { IComponentConstructor } from '../view/Component';

export const withChatList = function withChatList(
  ComponentClass: IComponentConstructor
) {
  return connect((state) => {
    const chatsData = state.chat?.list ?? [];
    return { chatsData: [...chatsData] };
  })(ComponentClass);
};
