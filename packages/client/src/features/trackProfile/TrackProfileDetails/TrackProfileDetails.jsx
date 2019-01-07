import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as selectors from '@soundnode-redux/client/src/features/trackProfile/trackProfileSelectors';
import Heading from '@soundnode-redux/client/src/common/components/Heading';
import ColumnLayout from '@soundnode-redux/client/src/common/components/layouts/ColumnLayout';
import TrackUsername from './TrackUsername';
import TrackDescription from './TrackDescription';
import TrackActions from './TrackActions';

function TrackProfileDetails({
  title, username, description, userRoute,
}) {
  return (
    <ColumnLayout width="800px">
      <Heading>{title}</Heading>
      <TrackUsername to={userRoute}>{username}</TrackUsername>
      <TrackDescription>{description}</TrackDescription>
      <TrackActions />
    </ColumnLayout>
  );
}

TrackProfileDetails.defaultProps = {
  userRoute: '',
  title: '',
  username: '',
  description: '',
};

TrackProfileDetails.propTypes = {
  userRoute: PropTypes.string,
  title: PropTypes.string,
  username: PropTypes.string,
  description: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    title: selectors.getProfiledTrackTitle(state),
    username: selectors.getProfiledTrackUsername(state),
    description: selectors.getProfiledTrackDescription(state),
    userRoute: selectors.getProfiledTrackUserRoute(state),
  };
}

export default connect(mapStateToProps)(TrackProfileDetails);
