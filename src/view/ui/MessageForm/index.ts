import { withError } from '~/src/controller/hocs/withError';
import { withAppLoader } from '~/src/controller/hocs/withAppLoader';
import { MessageForm } from './MessageForm';

const ConnectedMessageForm = withAppLoader(withError(MessageForm));

export { ConnectedMessageForm as MessageForm };
