import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TrackListHeader from './TrackListHeader';
import TrackListRow from './TrackListRow';

const CollapseButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  padding: 10px 0;
  cursor: pointer;
  border-top: 1px solid ${props => props.theme.colors.separatorDark};
  &:hover {
    background: ${props => props.theme.colors.separatorDark};
  }
`;

const TrackListContentWrapper = styled.div`
  max-height: ${props => (props.folded ? 147 : props.itemCount * 49)}px;
  transition: max-height 1000ms ease-in-out;
  overflow: hidden;
`;

const TrackListWrapper = styled.div`
  background-color: ${props => props.theme.colors.bg};
  box-shadow: 0 0 12px 8px ${props => props.theme.colors.boxShadowColor};
  border: 1px solid ${props => (props.active ? props.theme.colors.themeColor : 'transparent')};
  padding: 16px 16px 0 16px;
`;

class TrackList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folded: true,
    };
  }

  handleCollapseBtnClick = () => {
    this.setState({
      folded: !this.state.folded,
    });
  };

  render() {
    const { tracks } = this.props;
    return (
      <TrackListWrapper>
        <TrackListHeader />

        <TrackListContentWrapper folded={this.state.folded} itemCount={tracks.length}>
          {tracks.map((track, idx) => <TrackListRow key={idx} track={track} id={idx + 1} />)}
        </TrackListContentWrapper>

        {tracks.length >= 4 &&
          <CollapseButton onClick={this.handleCollapseBtnClick}>
            {this.state.folded ? 'Show More' : 'Show Less'}
          </CollapseButton>}

      </TrackListWrapper>
    );
  }
}

TrackList.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TrackList;
