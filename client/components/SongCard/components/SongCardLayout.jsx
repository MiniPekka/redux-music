import React, { PropTypes } from 'react';
// import Track from 'client/models/Track';
import SongCardInfoContainer from '../containers/SongCardInfoContainer';
import SongCardControlsContainer from '../containers/SongCardControlsContainer';
import SongCardImageContainer from '../containers/SongCardImageContainer';

const SongCardLayout = ({ track, active, trackIds }) => {
  if (!track) return null;
  return (
    <div className={`card song-card ${(active ? 'active' : '')}`}>
      <SongCardImageContainer track={track} trackIds={trackIds} />
      <SongCardInfoContainer track={track} />
      <SongCardControlsContainer track={track} />
    </div>
  );
};

SongCardLayout.propTypes = {
  track: PropTypes.object,
  active: PropTypes.bool,
  trackIds: PropTypes.array,
};

export default SongCardLayout;
