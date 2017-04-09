import { merge } from 'lodash';

const INITIAL_STATE = {
  tracks: {},
  artists: {},
  comments: {},
};

/**
 * The entities reducer which iterate through all our eneities tables,
 * merge incoming new entities one by one.
 * @param {object} state Global state object
 * @param {object} action Redux action object
 * @returns {object} A new state after reducing the incoming action
 */
export default function entitiesReducer(state = INITIAL_STATE, action) {
  if (action.entities) {
    // merge provided by lodash will recursively merge objects.
    // Also see: http://redux.js.org/docs/recipes/reducers/UpdatingNormalizedData.html
    return merge({}, state, action.entities);
  }
  return state;
}

/**
 * Get the entities state from global state
 * @param {object} state Global state object
 * @returns {object} Entities state
 */
export const getEntitiesState = state => state.entities;

/**
 * Returns artist object by artistId
 * @param {object} state Global state object
 * @param {number} artistId ArtistId field of an artist object
 * @returns {object} Artist object whose id equals to artistId
 */
export const getArtistById = (state, artistId) =>
  artistId && getEntitiesState(state).artists[String(artistId)];

/**
 * Returns track object by trackId
 * @param {object} state global state object
 * @param {number} trackId trackId field of a sound track object
 * @returns {object} Track object whose id is trackId or undefined if the trackId is not valid.
 */
export const getTrackById = (state, trackId) =>
  trackId && getEntitiesState(state).tracks[String(trackId)];

/**
 * Returns comment object by commentId
 * @param {object} state Global state
 * @param {number} commentId CommentId field of an comment object
 * @returns {object} Comment object whose id equals commentId
 */
export const getCommentById = (state, commentId) =>
  commentId && getEntitiesState(state).comments[String(commentId)];

/**
 * Returns the Artist object of a track specified by trackId
 * @param {Object} state Global state object
 * @param {Number} trackId The id of the track
 * @returns {Object} Artist object who is the owner of track specified by trackId
 */
export function getArtistByTrackId(state, trackId) {
  const track = getTrackById(state, trackId);
  const artistId = track && track.userId;
  return getArtistById(state, artistId);
}

/**
 * Returns artist object who made the comment specified by commentId
 * @param {Object} state Global state object
 * @param {Number} commentId The id of the comment
 * @returns {Object} Artist object
 */
export function getArtistByCommentId(state, commentId) {
  const comment = getCommentById(state, commentId);
  const artistId = comment && comment.userId;
  return getArtistById(state, artistId);
}
