import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as selectors from 'features/userProfile/userProfileSelectors';
import PageHeaderInfoLayout from 'common/components/layouts/PageHeaderInfoLayout';
import UserProfileAvatar from './UserProfileAvatar';
import UserProfileDetails from './UserProfileDetails';

function UserProfileHeader({ avatarUrl, permalinkUrl, username, followersCount, description }) {
  return (
    <PageHeaderInfoLayout>
      <UserProfileAvatar avatarUrl={avatarUrl} permalinkUrl={permalinkUrl} />
      <UserProfileDetails
        username={username}
        followersCount={followersCount}
        description={description}
      />
    </PageHeaderInfoLayout>
  );
}

UserProfileHeader.defaultProps = {
  ...UserProfileAvatar.defaultProps,
  ...UserProfileDetails.defaultProps,
};

UserProfileHeader.propTypes = {
  avatarUrl: PropTypes.string,
  permalinkUrl: PropTypes.string,
  username: PropTypes.string,
  followersCount: PropTypes.string,
  description: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    avatarUrl: selectors.getUserAvatarUrl(state),
    permalinkUrl: selectors.getUserPermalinkUrl(state),
    username: selectors.getUsername(state),
    followersCount: selectors.getUserFollowersCount(state),
    description: selectors.getUserDescription(state),
  };
}

export default connect(mapStateToProps)(UserProfileHeader);
