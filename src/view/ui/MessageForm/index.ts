import { withError } from '~/src/hocs/withError';
import { withAppLoader } from '~/src/hocs/withAppLoader';
import { MessageForm } from './MessageForm';

const ConnectedMessageForm = withAppLoader(withError(MessageForm));

export { ConnectedMessageForm as MessageForm };
