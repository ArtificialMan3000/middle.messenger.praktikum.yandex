import { withError } from '~/src/controller/hocs/withError';
import { withLoader } from '~/src/controller/hocs/withLoader';
import { MessageForm } from './MessageForm';

const ConnectedMessageForm = withLoader(withError(MessageForm));

export { ConnectedMessageForm as MessageForm };
