import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { USER_PROFILE_ROUTE } from 'client/common/constants/routeConsts';
import { connect } from 'react-redux';
import { getCommentById, getUserByCommentId } from 'client/features/entities/entitiesSelectors';
import { getSmallVersion } from 'client/common/utils/imageUtils';

import { FONT_COLOR_SECONDARY } from 'client/app/css/colors';

import CommentUserAvatar from './CommentUserAvatar';
import CommentUsername from './CommentUsername';

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  align-items: flex-start;
  margin: 20px 0;
  max-height: 60px;
`;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CommentBody = styled.p`
  font-size: 0.8rem;
  margin: 5px 0 0 0;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentTimestamp = styled.span`
  color: ${FONT_COLOR_SECONDARY};
  font-size: 0.8rem;
`;

function TrackProfileComment({ commentBody, userId, username, commentTimestamp, userAvatarUrl }) {
  const userLink = `${USER_PROFILE_ROUTE}/${userId}`;

  return (
    <Wrapper>
      <CommentUserAvatar linkTo={userLink} userAvatarUrl={userAvatarUrl} />
      <CommentWrapper>
        <CommentHeader>
          <CommentUsername linkTo={userLink}>{username}</CommentUsername>
          <CommentTimestamp>{commentTimestamp}</CommentTimestamp>
        </CommentHeader>
        <CommentBody>{commentBody}</CommentBody>
      </CommentWrapper>
    </Wrapper>
  );
}

function mapStateToProps(state, { commentId }) {
  const comment = getCommentById(state, commentId);
  const user = getUserByCommentId(state, commentId);
  return {
    userAvatarUrl: getSmallVersion(user.avatarUrl),
    username: user.username,
    commentBody: comment.body,
    commentTimestamp: comment.createdAt.replace('+0000', ''),
    userId: user.id,
  };
}

TrackProfileComment.defaultProps = {
  userAvatarUrl: '',
  username: '',
  commentBody: '',
  commentTimestamp: '',
  userId: 0,
};

TrackProfileComment.propTypes = {
  userAvatarUrl: PropTypes.string,
  username: PropTypes.string,
  commentBody: PropTypes.string,
  commentTimestamp: PropTypes.string,
  userId: PropTypes.number,
};

export default connect(mapStateToProps)(TrackProfileComment);