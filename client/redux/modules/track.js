import { fromJS } from 'immutable';
import Track from 'client/models/Track';
import CommentMap from 'client/models/CommentMap';
import { denormalizeTrack, denormalizeComments } from 'client/models/denormalizr';
import { trackSchema, commentArraySchema } from 'client/schemas';
import { CALL_API } from 'client/redux/middlewares/apiMiddleware';
import {
  TRACK_REQUEST,
  TRACK_RECEIVE,
  TRACK_FAILURE,
  TRACK_COMMENTS_REQUEST,
  TRACK_COMMENTS_RECEIVE,
  TRACK_COMMENTS_FAILURE
} from 'client/constants/ActionTypes';

/* Actions */
const fetchTrack = trackId => ({
  [CALL_API]: {
    endpoint: `/sc/api-v1/tracks/${trackId}`,
    method: 'GET',
    types: [TRACK_REQUEST, TRACK_RECEIVE, TRACK_FAILURE],
    schema: trackSchema
  }
});

const fetchComments = trackId => ({
  [CALL_API]: {
    endpoint: `/sc/api-v1/tracks/${trackId}/comments`,
    method: 'GET',
    query: {
      limit: 20
    },
    types: [TRACK_COMMENTS_REQUEST, TRACK_COMMENTS_RECEIVE, TRACK_COMMENTS_FAILURE],
    schema: commentArraySchema
  }
});

export const loadTrackPage = trackId => (dispatch) => {
  dispatch(fetchTrack(trackId));
  dispatch(fetchComments(trackId));
};

/* Reducer */

const INITIAL_STATE = fromJS({
  isTrackFetching: false,
  isCommentsFetching: false,
  track: new Track(),
  comments: new CommentMap(),
  commentsNextHref: null
});

const track = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRACK_REQUEST:
      return state.set('isTrackFetching', true);
    case TRACK_RECEIVE:
      return state.merge({
        track: denormalizeTrack(action.payload),
        isTrackFetching: false
      });
    case TRACK_COMMENTS_REQUEST:
      return state.set('isCommentsFetching', true);
    case TRACK_COMMENTS_RECEIVE:
      return state.merge({
        comments: denormalizeComments(action.payload),
        isCommentsFetching: false
      });
    default:
      return state;
  }
};
export default track;

/* State Selectors */
export const isTrackFetching = state => state.get('isTrackFetching');
export const isCommentsFetching = state => state.get('isCommentsFetching');
export const getTrack = state => state.get('track'); // Return the immutable record
export const getComments = state => state.get('comments');
