import { withProfileLoader, withProfileError } from '~/src/controller/profile';
import { ProfileForm } from './ProfileForm';

const ConnectedProfileForm = withProfileLoader(withProfileError(ProfileForm));

export { ConnectedProfileForm as ProfileForm };
