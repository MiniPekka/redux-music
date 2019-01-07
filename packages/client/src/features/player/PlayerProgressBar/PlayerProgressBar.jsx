import React from 'react';
import PropTypes from 'prop-types';
import { computeOffset } from '@soundnode-redux/client/src/features/player/playerUtils';
import { connect } from 'react-redux';
import * as playerActions from '@soundnode-redux/client/src/features/player/playerActions';
import { getCurrentTime, isPlayerSeeking } from '@soundnode-redux/client/src/features/player/playerSelectors';
import PlayerSlider from '@soundnode-redux/client/src/features/player/shared/PlayerSlider';
import Wrapper from './Wrapper';

class PlayerProgressBar extends React.Component {
  componentDidUpdate(prevProps) {
    const { seeking } = this.props;
    const prevSeeking = prevProps.seeking;

    if (!prevSeeking && seeking) {
      // Listen to event only when we start seeking
      document.addEventListener('mousemove', this.handleSeekKnobMouseMove);
      document.addEventListener('mouseup', this.handleSeekKnobMouseUp);
    } else if (prevSeeking && !seeking) {
      // Remove listeners when we finish seeking
      document.removeEventListener('mousemove', this.handleSeekKnobMouseMove);
      document.removeEventListener('mouseup', this.handleSeekKnobMouseUp);
    }
  }

  handleMouseDown = () => {
    this.props.beginSeek();
  };

  handleMouseUp = (e) => {
    const { duration, updateTimeAndEndSeek } = this.props;
    const newTime = computeOffset(this.seekBar, duration, e);
    updateTimeAndEndSeek(newTime);
  };

  // Can not use bind because it will fail when removing listener.
  handleSeekKnobMouseMove = (e) => {
    const { duration, updateTimeOnSeek } = this.props;
    const newTime = computeOffset(this.seekBar, duration, e);
    updateTimeOnSeek(newTime);
  };

  render() {
    const { duration, currentTime } = this.props;
    return (
      <Wrapper
        innerRef={(sb) => {
          this.seekBar = sb;
        }}
      >
        <PlayerSlider
          minValue={0}
          maxValue={duration}
          currentValue={currentTime}
          onProgressBarMouseDown={this.handleMouseDown}
          onProgressBarMouseUp={this.handleMouseUp}
          onSeekKnobMouseDown={this.handleMouseDown}
          onSeekKnobMouseUp={this.handleMouseUp}
        />
      </Wrapper>
    );
  }
}

PlayerProgressBar.propTypes = {
  seeking: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  updateTimeOnSeek: PropTypes.func.isRequired,
  beginSeek: PropTypes.func.isRequired,
  updateTimeAndEndSeek: PropTypes.func.isRequired,
};

function mapStateToProps(state, { playerTrack }) {
  return {
    seeking: isPlayerSeeking(state),
    currentTime: getCurrentTime(state),
    // Extract a formatDurationCompact util. convertMsToSec.
    duration: playerTrack.duration / 1000.0,
  };
}

export default connect(mapStateToProps, playerActions)(PlayerProgressBar);
