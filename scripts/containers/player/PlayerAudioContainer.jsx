import { connect } from 'react-redux';
import PlayerAudio from '../../components/Player/PlayerAudio';
import * as selectors from '../../selectors/playerSelectors';
import actions from '../../actions';

const mapStateToProps = state => ({
  isPlaying: selectors.getPlayingState(state),
  volume: selectors.getCurrentVolume(state),
  mode: selectors.getPlayerMode(state),
  streamUrl: selectors.getStreamUrl(state),
  currentTime: selectors.getCurrentTime(state),
  isSeeking: selectors.getSeekState(state)
});

const mapDispatchToProps = dispatch => ({
  // Update time in store
  onTimeUpdate: (e) => { dispatch(actions.sagaUpdateTimeOnPlay(e.target.currentTime)); },
  onEnded: () => { dispatch(actions.sagaPlayNextSong()); },
  onLoadedMetadata: (audioElement) => {
    const duration = Math.floor(audioElement.duration);
    dispatch(actions.changeDuration(duration));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(PlayerAudio);