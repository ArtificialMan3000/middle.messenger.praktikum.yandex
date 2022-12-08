import { withError } from '~/src/controller/auth/hocs/withError';
import { withLoader } from '~/src/controller/auth/hocs/withLoader';
import { MessageForm } from './MessageForm';

const ConnectedMessageForm = withLoader(withError(MessageForm));

export { ConnectedMessageForm as MessageForm };
