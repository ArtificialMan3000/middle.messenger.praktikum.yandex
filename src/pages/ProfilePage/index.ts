import { connect } from '~/src/store/connect';
import type { TState } from '~/src/store/types';
import { ProfilePage, TProfilePageProps } from './ProfilePage';

function mapUserToProps(state: TState) {
  const loadingStatus = state.user?.profile?.query?.status;
  const props = {
    isLoaderDisplayed: true,
  };
  if (loadingStatus === 'loaded') {
    props.isLoaderDisplayed = false;
  }
  return props;
}

export type TProfilePage = InstanceType<typeof ConnectedProfilePage>;

const ConnectedProfilePage = connect(mapUserToProps)(ProfilePage);

export { ConnectedProfilePage as ProfilePage };

export type { TProfilePageProps } from './ProfilePage';
