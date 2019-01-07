import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';
import { getReposts, isAuthed, getFavoriteTrackIds } from '@soundnode-redux/client/src/features/auth/authSelectors';
import * as authActions from '@soundnode-redux/client/src/features/auth/authActions';
import * as copyActions from '@soundnode-redux/client/src/features/copy/copyActions';
import { showAddToPlaylistModal } from '@soundnode-redux/client/src/features/modals/addToPlaylist/addToPlaylistActions';
import { TRACK_PROFILE_ROUTE } from '@soundnode-redux/client/src/common/constants/routeConsts';
import DropdownListItem from './DropdownListItem';

const Wrapper = styled.div`
  width: 150px;
  z-index: ${props => props.theme.zIndexes.playQueueDropdownList};
  background: ${props => props.theme.colors.bg};
  position: absolute;
  box-shadow: 0 0 12px 8px ${props => props.theme.colors.boxShadowColor};
  border: solid 0px;
  border-radius: 5px;
  right: 0;
  top: 0;
`;

class DropdownList extends React.Component {
  handleClickOutside = (e) => {
    console.log('handleClickOutside');
    this.props.onClose();
  };

  handleLikeClick = (e) => {
    if (!this.props.authed) {
      this.props.authRequired();
    } else {
      const toggleLike = this.props.liked ? this.props.doUnlikeTrack : this.props.doLikeTrack;
      toggleLike(this.props.trackId);
    }
  };

  handleRepostClick = (e) => {
    if (!this.props.authed) {
      this.props.authRequired();
    } else {
      const toggleRepost = this.props.reposted ? this.props.removeRepost : this.props.createRepost;
      toggleRepost(this.props.trackId);
    }
  };

  handleAddToPlaylistClick = () => {
    if (!this.props.authed) {
      this.props.authRequired();
    } else {
      this.props.showAddToPlaylistModal(this.props.trackId);
    }
  };

  render() {
    const { trackId, reposted, liked } = this.props;
    return (
      <Wrapper>
        <DropdownListItem
          iconName="heart"
          text={liked ? 'Unlike' : 'Like'}
          onClick={this.handleLikeClick}
        />
        <DropdownListItem
          type="button"
          iconName="retweet"
          text={reposted ? 'Remove repost' : 'Add repost'}
          onClick={this.handleRepostClick}
        />
        <DropdownListItem
          iconName="bookmark"
          text="Add to playlist"
          onClick={this.handleAddToPlaylistClick}
        />
        {/* <DropdownListItem iconName="external-link" text="Permalink" /> */}
        <DropdownListItem
          iconName="music"
          text="Track profile"
          to={`${TRACK_PROFILE_ROUTE}/${trackId}`}
        />
      </Wrapper>
    );
  }
}

function mapStateToProps(state, { trackId }) {
  return {
    authed: isAuthed(state),
    reposted: getReposts(state).includes(trackId),
    liked: getFavoriteTrackIds(state).includes(trackId),
  };
}

const actions = {
  ...authActions,
  ...copyActions,
  showAddToPlaylistModal,
};

export default compose(connect(mapStateToProps, actions), onClickOutside)(DropdownList);
