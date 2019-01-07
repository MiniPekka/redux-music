import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TrackImage from '@soundnode-redux/client/src/common/components/images/TrackImage';
import { formatDurationCompact, formatNumberCompact } from '@soundnode-redux/client/src/common/utils/formatUtils';
import { getUserByTrackId } from '@soundnode-redux/client/src/features/entities/entitiesSelectors';
import { USER_PROFILE_ROUTE, TRACK_PROFILE_ROUTE } from '@soundnode-redux/client/src/common/constants/routeConsts';
import { isTrackActive } from '@soundnode-redux/client/src/features/player/playerSelectors';
import { playPlaylist } from '@soundnode-redux/client/src/features/playlists/playlistsActions';
import Table from './Table';

function TrackListRow({ track, trackArtist, playlistId, id, active, handleDoubleClick }) {
  return (
    <Table.Row
      active={active}
      onDoubleClick={() => {
        handleDoubleClick(playlistId, id - 1);
      }}
    >
      <Table.IdCell>{id}</Table.IdCell>
      <Table.Cell width="40%">
        <TrackImage src={track.artworkUrl} size="tiny" mr="10px" />
        <Table.Link to={`${TRACK_PROFILE_ROUTE}/${track.id}`}>{track.title}</Table.Link>
      </Table.Cell>
      <Table.Cell width="30%">
        <Table.Link to={`${USER_PROFILE_ROUTE}/${trackArtist.id}`}>
          {trackArtist.username}
        </Table.Link>
      </Table.Cell>
      <Table.Cell width="15%">
        <Table.Text>{formatDurationCompact(track.duration)}</Table.Text>
      </Table.Cell>
      <Table.Cell width="10%">
        <Table.Text>{formatNumberCompact(track.playbackCount)}</Table.Text>
      </Table.Cell>
    </Table.Row>
  );
}

TrackListRow.propTypes = {
  track: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
};

function mapStateToProps(state, { track }) {
  return {
    trackArtist: getUserByTrackId(state, track.id),
    // Should also check if current playlist is active!!
    active: isTrackActive(state, track.id),
  };
}

const actions = {
  handleDoubleClick: playPlaylist,
};

export default connect(mapStateToProps, actions)(TrackListRow);
