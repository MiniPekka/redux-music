import {createSelector} from 'reselect';
import * as fromReducers from '../reducers';

/*
 * Composing all memoized selectors (Reusing selectors in reducers) for SongCardsContainer
 */

export const getVisiblePlaylistName = createSelector(
  [fromReducers.getVisiblePlaylistName],
  playlistName => playlistName
);

export const getPlaylistName = createSelector(
  [fromReducers.getPlaylistName],
  playlist => playlist
);

export const getFetchState = createSelector(
  [fromReducers.getFetchState],
  isFetching => isFetching
);

export const getPlayingState = createSelector(
  [fromReducers.getPlayingState],
  isPlaying => isPlaying
);


// To memoize it we have to check out createSelector with param!
export const getIsActive = (state, id) => {
  const currentSongId = fromReducers.getCurrentSongId(state);
  return currentSongId ? id === currentSongId : false;
}

/*
 * Return array of song objects according to visiblePlaylist
 */
export const getVisibleSongsAsArray = createSelector(
  [fromReducers.getVisibleSongMap, fromReducers.getVisibleSongIds],
  (songsById, songIds) => {
    if (songIds) return songIds.map(id => songsById[id]);
    return [];
  }
);

/*
 * Return the currently active song in player. (Playing / Paused)
 */
export const getCurrentSong = createSelector(
  [fromReducers.getPlayerSongMap, fromReducers.getCurrentSongId],
  (songsById, songId) => {
    if (songId) return songsById[songId];
    return null;
  }
);
