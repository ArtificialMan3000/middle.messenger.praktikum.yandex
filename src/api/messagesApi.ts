import { WSTransport, WSTransportEvents } from '../utils/WSTransport';

export type TOldMessage = {
  chat_id: number;
  time: string;
  user_id: string;
  content: string;
  type: string;
};

export type TFreshMessage = {
  id: string;
  time: string;
  user_id: string;
  content: string;
  type: 'message';
};

export type TConnectedMessage = {
  content: string;
  type: 'user connected';
};

export type TMessageResponse =
  | TOldMessage[]
  | TFreshMessage
  | TConnectedMessage;

type TWSHandlers = {
  onopen?: (evt: Event) => void;
  onclose?: (evt: CloseEvent) => void;
  onmessage?: (data: TMessageResponse) => void;
  onerror?: (evt: Event) => void;
};

export class MessagesAPI {
  static URL = 'wss://ya-praktikum.tech/ws/chats';

  async connect(
    userId: number,
    chatId: number,
    token: string,
    { onopen, onclose, onmessage, onerror }: TWSHandlers
  ) {
    const transport = new WSTransport(
      `${MessagesAPI.URL}/${userId}/${chatId}/${token}`
    );

    if (onopen) {
      transport.on(WSTransportEvents.Open, onopen);
    }

    if (onclose) {
      transport.on(WSTransportEvents.Close, onclose);
    }

    if (onmessage) {
      transport.on(WSTransportEvents.Message, onmessage);
    }

    if (onerror) {
      transport.on(WSTransportEvents.Error, onerror);
    }

    await transport.connect();

    return transport;
  }
}
