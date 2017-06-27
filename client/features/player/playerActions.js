import { clearShufflePlaylist, shufflePlaylist } from 'features/playlist/playlistActions';
import { getPlaylistByMode } from 'features/playlist/playlistSelectors';
import { getLastVolume, setLastVolume } from 'common/utils/localStorageUtils';
import {
  isPlayerSeeking,
  getCurrentTime,
  getCurrentVolume,
  getCurrentPlayerTrack,
  getPlayerTrackId,
  getPlayerMode,
} from './playerSelectors';
import * as types from './playerConsts';

/* Action Creators */
export const beginSeek = () => ({ type: types.PLAYER_SEEK_BEGIN });

export const endSeek = () => ({ type: types.PLAYER_SEEK_END });

export const playSong = () => ({ type: types.PLAYER_SONG_PLAY });

export const pauseSong = () => ({ type: types.PLAYER_SONG_PAUSE });

export const beginVolumeSeek = () => ({ type: types.PLAYER_VOLUME_SEEK_BEGIN });

export const endVolumeSeek = () => ({ type: types.PLAYER_VOLUME_SEEK_END });

export const mute = () => ({ type: types.PLAYER_MUTE });

export const clearTime = () => ({ type: types.PLAYER_TIME_CLEAR });

export const changeSong = trackId => ({
  type: types.PLAYER_SONG_CHANGE,
  payload: {
    trackId,
  },
});

export const updateTime = currentTime => ({
  type: types.PLAYER_TIME_UPDATE,
  payload: {
    currentTime,
  },
});

export const changeVolume = volume => ({
  type: types.PLAYER_VOLUME_CHANGE,
  payload: {
    volume,
  },
});

export const changePlayMode = mode => ({
  type: types.PLAYER_PLAY_MODE_CHANGE,
  payload: {
    mode,
  },
});

/* Redux Thunks Domain Logic */
export function updateTimeIfNeeded(rawTime) {
  return (dispatch, getState) => {
    const state = getState();
    const newTime = Math.floor(rawTime);
    const currentTime = getCurrentTime(state);
    if (newTime !== currentTime) {
      dispatch(updateTime(newTime));
    }
  };
}

export function updateTimeOnPlay(time) {
  return (dispatch, getState) => {
    const state = getState();
    const seeking = isPlayerSeeking(state);
    if (!seeking) {
      dispatch(updateTimeIfNeeded(time));
    }
  };
}

export function updateTimeOnSeek(time) {
  return (dispatch) => {
    dispatch(updateTimeIfNeeded(time));
  };
}

export function updateTimeAndEndSeek(time) {
  return (dispatch) => {
    dispatch(updateTimeIfNeeded(time));
    dispatch(endSeek());
  };
}

export function updateVolumeAndEndSeek(volume) {
  return (dispatch) => {
    dispatch(changeVolume(volume));
    dispatch(endVolumeSeek());
  };
}

export function toggleMute() {
  return (dispatch, getState) => {
    const state = getState();
    const currVolume = getCurrentVolume(state);
    if (currVolume === 0) {
      const lastVolume = getLastVolume();
      dispatch(changeVolume(lastVolume));
    } else {
      setLastVolume(currVolume);
      dispatch(mute());
    }
  };
}

// Change to new song or just play paused current song.
export function changeSongAndPlay(newTrackId) {
  return (dispatch, getState) => {
    const state = getState();
    const curTrackId = getCurrentPlayerTrack(state);
    dispatch(pauseSong());
    dispatch(clearTime());
    if (curTrackId !== newTrackId) {
      dispatch(changeSong(newTrackId));
    }
    dispatch(playSong());
  };
}

// When we click on next or prev.
export function playSongByAction(actionType) {
  return (dispatch, getState) => {
    const state = getState();
    const mode = getPlayerMode(state);
    let nextTrackId = null;
    const curTrackId = getPlayerTrackId(state);
    const activePlaylist = getPlaylistByMode(state);
    if (mode === types.REPEAT) {
      nextTrackId = curTrackId;
    } else {
      const idx = activePlaylist.indexOf(curTrackId);
      let nextIdx = actionType === types.NEXT ? idx + 1 : idx - 1;
      nextIdx = nextIdx >= activePlaylist.length ? (nextIdx = activePlaylist.length - 1) : nextIdx;
      nextIdx = nextIdx < 0 ? 0 : nextIdx;
      nextTrackId = activePlaylist[nextIdx];
    }

    dispatch(changeSongAndPlay(nextTrackId));
  };
}

export function playNextSong() {
  return (dispatch) => {
    dispatch(playSongByAction(types.NEXT));
  };
}

export function playPrevSong() {
  return (dispatch) => {
    dispatch(playSongByAction(types.PREV));
  };
}

// When we click mode icons on player.
export function togglePlayMode(newMode) {
  return (dispatch, getState) => {
    const state = getState();
    const currMode = getPlayerMode(state);
    if (currMode === newMode) {
      /* Toggle off current mode, set to default mode */
      dispatch(changePlayMode(types.DEFAULT_MODE));
      if (newMode === types.SHUFFLE) dispatch(clearShufflePlaylist());
    } else {
      /* Toggle on new mode */
      dispatch(changePlayMode(newMode));
      if (newMode === types.SHUFFLE) {
        dispatch(shufflePlaylist());
      }
    }
  };
}
