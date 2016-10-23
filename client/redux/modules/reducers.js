/* Main reducer */
import { combineReducers } from 'redux-immutable';
import { List } from 'immutable';

import * as fromPlayer from './player';
import * as fromSearch from './search';
import * as fromUser from './user';
import * as fromArtist from './artist';
import * as fromCharts from './charts';
import * as fromPlaylist from './playlist';
import * as fromTrack from './track';
import * as fromEntities from './entities';
import * as fromUI from './ui';

const rootReducer = combineReducers({
  ui: fromUI.default,
  entities: fromEntities.default,
  charts: fromCharts.default,
  playlist: fromPlaylist.default,
  player: fromPlayer.default,
  user: fromUser.default,
  search: fromSearch.default,
  artist: fromArtist.default,
  track: fromTrack.default
});

/* From ui */
export const getVisibleTrackIds = state => fromUI.getVisibleTrackIds(state.get('ui'));
export const isUIFetching = state => fromUI.isFetching(state.get('ui'));
/* From entities */

// Get single track

export const getAllArtists = state => fromEntities.getArtists(state.get('entities'));
export const getAllTracks = state => fromEntities.getTracks(state.get('entities'));

// Select one track from entities tree.
export const getTrackById = (state, trackId) =>
  fromEntities.getTrackById(state.get('entities'), trackId);

export const getArtistById = (state, artistId) =>
  fromEntities.getArtistById(state.get('entities'), artistId);

export const getCommentById = (state, commentId) =>
  fromEntities.getCommentById(state.get('entities'), commentId);

export const getArtistByTrackId = (state, trackId) => {
  const track = getTrackById(state, trackId);
  const artistId = track && track.getArtistId();
  return getArtistById(state, artistId);
};

export const getArtistByCommentId = (state, commentId) => {
  const comment = getCommentById(state, commentId);
  const artistId = comment && comment.getArtistId();
  return getArtistById(state, artistId);
};

// Get Array of Immutable Records
// export const getTracksAsArray = (state, trackIds) =>
//   trackIds.map(trackId => fromEntities.getTrackById(state.get('entities', trackId)));

/* From Charts */
export const getChartsGenre = state => fromCharts.getGenre(state.get('charts'));
export const getChartsTrackMap = state => fromCharts.getTrackMap(state.get('charts'));
export const getChartsTrackIds = state => fromCharts.getTrackIds(state.get('charts'));
export const isChartsFetching = state => fromCharts.isFetching(state.get('charts'));
// export const getChartsTracksAsArray = (state) => {
//   const trackIds = fromCharts.getTrackIds(state.get('charts'));
//   return trackIds.map(trackId => getTrackById(state, trackId));
// };

/* From Track */
export const isTrackFetching = state => fromTrack.isTrackFetching(state.get('track'));
export const isTrackCommentsFetching = state => fromTrack.isCommentsFetching(state.get('track'));
export const getTrackId = state => fromTrack.getTrackId(state.get('track'));
export const getTrackCommentIds = state => fromTrack.getCommentIds(state.get('track'));

/* From Playlist */
export const isPlaylistHidden = state => fromPlaylist.isPlaylistHidden(state.get('playlist'));
export const getPlaylistTrackIds = state => fromPlaylist.getTrackIds(state.get('playlist'));
export const isPlaylistEmpty = state => fromPlaylist.isEmpty(state.get('playlist'));
export const isTrackInPlaylist = (state, trackId) => getPlaylistTrackIds(state).indexOf(trackId);

/* From Artist */
export const getArtistRecord = state => fromArtist.getArtistRecord(state.get('artist'));
export const getArtistTrackMap = state => fromArtist.getArtistTrackMap(state.get('artist'));
export const isArtistFetching = state => fromArtist.isArtistFetching(state.get('artist'));
export const isArtistTracksFetching = state =>
  fromArtist.isTracksFetching(state.get('artist'));

/* From Search */
export const isSearching = state => fromSearch.isFetching(state.get('search'));
export const isSearchResultShown = state => fromSearch.isShown(state.get('search'));

export const getDropdownSearchTrackIds = state =>
  fromSearch.getDropdownSearchTrackIds(state.get('search'));

export const getDropdownSearchArtistIds = state =>
  fromSearch.getDropdownSearchArtistIds(state.get('search'));

// Get the general search result ids.
export const getSearchResultTrackIds = state => fromSearch.getSearchTrackIds(state.get('search'));

/* From user */
export const getUserLikes = state => fromUser.getLikes(state.get('user'));
export const isTrackLiked = (state, trackId) => {
  const likes = getUserLikes(state);
  return likes.has(trackId);
};

export const getUserId = state => fromUser.getUid(state.get('user'));
export const getDisplayName = state => fromUser.getDisplayName(state.get('user'));
export const getPhotoUrl = state => fromUser.getPhotoUrl(state.get('user'));
// Return all trackIds liked by current logged in user.
export const getUserLikeIds = state => List(getUserLikes(state).keySeq());

/* From player */

export const getPlayerTrackId = state => fromPlayer.getPlayerTrackId(state.get('player'));
export const getShuffleDraw = state => fromPlayer.getShuffleDraw(state.get('player'));
export const getShuffleDiscard = state => fromPlayer.getShuffleDiscard(state.get('player'));
export const shuffleInitialized = state => fromPlayer.shuffleInitialized(state.get('player'));
export const isPlayerPlaying = state => fromPlayer.isPlaying(state.get('player'));
export const isPlayerSeeking = state => fromPlayer.isSeeking(state.get('player'));
export const getCurrentVolume = state => fromPlayer.getCurrentVolume(state.get('player'));
export const isVolumeSeeking = state => fromPlayer.isVolumeSeeking(state.get('player'));
export const getCurrentTime = state => fromPlayer.getCurrentTime(state.get('player'));
export const getPlayerMode = state => fromPlayer.getPlayerMode(state.get('player'));

// (Reselect) Return the current player track (Immutable.Record)
export const getCurrentPlayerTrack = (state) => {
  const trackId = getPlayerTrackId(state);
  return getTrackById(state, trackId);
};

/**
 * Return if the current track(byId) is loaded in player
 * @param  {[type]} state [description]
 * @param  {[type]} id    [description]
 * @return {[type]}       [description]
 */
export const isTrackActive = (state, trackId) => {
  const playerTrackId = getPlayerTrackId(state);
  if (playerTrackId && trackId) {
    return playerTrackId.toString() === trackId.toString();
  }
  return false;
};

// Return if the specific song is playing or not
export const isTrackPlaying = (state, id) =>
  isTrackActive(state, id) && isPlayerPlaying(state);

export default rootReducer;