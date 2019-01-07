import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTrackById } from '@soundnode-redux/client/src/features/entities/entitiesSelectors';
import { isTrackActive } from '@soundnode-redux/client/src/features/player/playerSelectors';
import Card from '@soundnode-redux/client/src/common/components/Card';
import SongCardDetails from './SongCardDetails';
import SongCardActions from './SongCardActions';
import SongCardImage from './SongCardImage';

function SongCard({ track, active, playlist }) {
  if (track && track.streamable) {
    return (
      <Card active={active}>
        <SongCardImage track={track} active={active} playlist={playlist} />
        <SongCardDetails track={track} />
        <SongCardActions track={track} />
      </Card>
    );
  }
  return null;
}

function mapStateToProps(state, { trackId }) {
  return {
    track: getTrackById(state, trackId),
    active: isTrackActive(state, trackId),
  };
}

const ConnectedSongCard = connect(mapStateToProps)(SongCard);

const propTypes = {
  trackId: PropTypes.number.isRequired,
};

const injectedProps = {
  track: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
};

SongCard.propTypes = {
  ...injectedProps,
  ...propTypes,
};

ConnectedSongCard.propTypes = propTypes;

export default ConnectedSongCard;
