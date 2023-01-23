import { TChatMessage } from '~/src/controller/messages';
import { connect } from '../store/connect';
import { IComponentConstructor } from '../view/Component';

export const withChatMessages = function withChatMessages(
  ComponentClass: IComponentConstructor
) {
  return connect((state) => {
    const currChatId = state.chat?.selected?.id;
    const messages = state.messages?.[currChatId] || [];
    const userId = state.user?.data?.id;

    if (userId) {
      const messagesWithDirection = messages.map((message: TChatMessage) => {
        if (message.user_id !== userId) {
          return { ...message, direction: 'in' };
        }
        return { ...message, direction: 'out' };
      });

      return { messagesData: messagesWithDirection };
    }

    return { messagesData: [] };
  })(ComponentClass);
};
