import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getMyId } from '@soundnode-redux/client/src/features/auth/authSelectors';
import styled from 'styled-components';
import {
  updateFilterText,
  addToPlaylist,
  removeFromPlaylist,
} from '@soundnode-redux/client/src/features/modals/addToPlaylist/addToPlaylistActions';
import { fetchPlaylists } from '@soundnode-redux/client/src/features/playlists/playlistsActions';
import { centerFixed } from '@soundnode-redux/client/src/app/css/mixin';
import PlaylistCompact from '@soundnode-redux/client/src/features/modals/addToPlaylist/PlaylistCompact';
import { getPlaylists } from '@soundnode-redux/client/src/features/playlists/playlistsSelectors';
import {
  getFilterText,
  getRequestQueue,
} from '@soundnode-redux/client/src/features/modals/addToPlaylist/addToPlaylistSelectors';
import { getTrackById } from '@soundnode-redux/client/src/features/entities/entitiesSelectors';

const Wrapper = styled.div`
  width: 550px;
  max-height: 420px;
  overflow-y: scroll;
  ${centerFixed} z-index: ${props => props.theme.zIndexes.modal};
  background-color: ${props => props.theme.colors.bgDark};
  opacity: 0.95;
  box-shadow: 0 0 12px 8px ${props => props.theme.colors.boxShadowColor};
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: block;
  margin-top: 20px;
`;

const Title = styled.span`
  font-size: 1.05rem;
  font-weight: bold;
  color: ${props => props.theme.colors.fontColorSub};
`;

const TrackName = styled.span`
  font-size: 1.05rem;
  color: ${props => props.theme.colors.fontColor};
`;

const FilterInput = styled.input`
  width: 100%;
  display: inline-block;
  border: none;
  text-align: left;
  font-family: 'Open Sans';
  font-size: 1rem;
  outline: 0;
  border-radius: 5px;
  padding: 6px 10px 6px 10px;
  font-weight: 300;
  background-color: #333333;
  height: 30px;
`;

class AddToPlaylistModal extends React.Component {
  componentDidMount() {
    this.props.actions.fetchPlaylists();
  }

  handleAddClick = (trackId, playlistId) => {
    this.props.actions.addToPlaylist(trackId, this.props.currentUserId, playlistId);
  };

  handleRemoveClick = (trackId, playlistId) => {
    this.props.actions.removeFromPlaylist(trackId, this.props.currentUserId, playlistId);
  };

  handleFilterChange = (e) => {
    const filterText = e.target.value.toLowerCase();
    this.props.actions.updateFilterText(filterText);
  };

  render() {
    const { track, playlists, filterText, requestQueue } = this.props;
    return (
      <Wrapper>
        <Row>
          <Title>Where do you want to add: </Title>
          <TrackName>{track.title}</TrackName>
        </Row>
        <Row>
          <FilterInput placeholder="Filter playlists" onChange={this.handleFilterChange} />
        </Row>
        <Row>
          {playlists
            .filter(pl => pl.title.toLowerCase().indexOf(filterText) !== -1)
            .map((playlist) => {
              const isAdded = playlist.tracks.includes(track.id) > 0;
              const requestInProgress = requestQueue.includes(playlist.id);
              return (
                <PlaylistCompact
                  playlistId={playlist.id}
                  playlistTitle={playlist.title}
                  key={playlist.id}
                  isAdded={isAdded}
                  requestInProgress={requestInProgress}
                  onClick={() => {
                    if (isAdded) {
                      this.handleRemoveClick(track.id, playlist.id);
                    } else {
                      this.handleAddClick(track.id, playlist.id);
                    }
                  }}
                />
              );
            })}
        </Row>
      </Wrapper>
    );
  }
}

function mapStateToProps(state, { trackId }) {
  return {
    track: getTrackById(state, trackId),
    currentUserId: getMyId(state),
    playlists: getPlaylists(state),
    filterText: getFilterText(state),
    requestQueue: getRequestQueue(state),
  };
}

const actions = {
  updateFilterText,
  fetchPlaylists,
  addToPlaylist,
  removeFromPlaylist,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToPlaylistModal);
