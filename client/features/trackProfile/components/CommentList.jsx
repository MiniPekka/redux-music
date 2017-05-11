import React from 'react';
import PropTypes from 'prop-types';

import infiniteScroll from 'client/common/components/Hocs/InfiniteScroll';
import Spinner from 'client/common/components/Spinner';
import CommentContainer from '../containers/CommentContainer';

const CommentList = ({ commentCount, commentIds, commentsFetching }) => {
  return (
    <div className="comments-container">
      <div className="comment-title">
        <h4>Comments: ({commentCount})</h4>
      </div>
      <div className="comment-list-container">
        <ul className="comment-list">
          {
            // #FIXME: Using idx as key is an anti-pattern,
            // however using commentId as key would results in children with same key error.
            commentIds.map((commentId, idx) => <CommentContainer key={idx} commentId={commentId} />)
          }
        </ul>
      </div>
      { commentsFetching && <Spinner /> }
    </div>
  );
};

CommentList.propTypes = {
  commentCount: PropTypes.number,
  commentIds: PropTypes.array,
  commentsFetching: PropTypes.bool,
};

export default infiniteScroll(CommentList);