import { connect } from 'react-redux';
// import { getPlayerMode, isPlaylistHidden } from 'client/redux/modules/reducers';
import { REPEAT, SHUFFLE } from 'client/redux/modules/player/consts';
import { getPlayerMode } from 'client/redux/modules/player/selectors';
import { togglePlayMode } from 'client/redux/modules/player/actions';

import { isPlaylistHidden } from 'client/redux/modules/playlist/selectors';
import { togglePlaylist } from 'client/redux/modules/playlist/actions';

import PlayerModeControls from '../components/PlayerModeControls';

const mapStateToProps = state => ({
  mode: getPlayerMode(state),
  playlistHidden: isPlaylistHidden(state),
});

const mapDispatchToProps = dispatch => ({
  onRepeatClick: () => { dispatch(togglePlayMode(REPEAT)); },
  onShuffleClick: () => { dispatch(togglePlayMode(SHUFFLE)); },
  onTogglePlaylistClick: () => { dispatch(togglePlaylist()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerModeControls);
