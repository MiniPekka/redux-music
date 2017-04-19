import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FONT_COLOR_SECONDARY } from 'client/constants/css/Colors';

const UserDescriptionWithStyle = styled.div`
  margin: 10px 0;
  font-size: 1.2rem;
  overflow: scroll;
  height: 240px;
  width: 500px;
  color: ${FONT_COLOR_SECONDARY};
  white-space: pre-wrap;
`;

function UserDescription({ text }) {
  return <UserDescriptionWithStyle>{text}</UserDescriptionWithStyle>;
}

// PropTypes.defaultProps = {
// };

UserDescription.propTypes = {
  text: PropTypes.string.isRequired,
};

export default UserDescription;