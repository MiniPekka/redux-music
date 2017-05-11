import { connect } from 'react-redux';
import { clearPlayQueue } from 'client/features/playlist/playlistActions';
import { getPlaylistByMode, isPlaylistHidden } from 'client/features/playlist/playlistSelectors';
import Playlist from '../components/Playlist';

const mapStateToProps = state => ({
  playlistTrackIds: getPlaylistByMode(state),
  playlistHidden: isPlaylistHidden(state),
});

function mapDispatchToProps(dispatch) {
  return {
    handleClearPlayQueue() {
      dispatch(clearPlayQueue());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);