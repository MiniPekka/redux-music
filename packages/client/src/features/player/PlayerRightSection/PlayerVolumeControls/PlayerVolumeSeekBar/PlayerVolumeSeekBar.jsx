import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { lighterGray } from '@soundnode-redux/client/src/app/css/colors';

import { computeOffset } from '@soundnode-redux/client/src/features/player/playerUtils';
import * as playerActions from '@soundnode-redux/client/src/features/player/playerActions';
import { getCurrentVolume, isVolumeSeeking } from '@soundnode-redux/client/src/features/player/playerSelectors';
import PlayerSlider from '@soundnode-redux/client/src/features/player/shared/PlayerSlider';
import Wrapper from './Wrapper';

class PlayerVolumeSeekBar extends React.Component {
  componentDidUpdate(prevProps) {
    const prevSeeking = prevProps.volumeSeeking;
    const currSeeking = this.props.volumeSeeking;
    if (!prevSeeking && currSeeking) {
      // Listen to event only when we start seeking
      document.addEventListener('mousemove', this.handleVolumeMouseMove);
      document.addEventListener('mouseup', this.handleVolumeMouseUp);
    } else if (prevSeeking && !currSeeking) {
      // Remove them only when we finish seeking
      document.removeEventListener('mousemove', this.handleVolumeMouseMove);
      document.removeEventListener('mouseup', this.handleVolumeMouseUp);
    }
  }

  handleVolumeMouseDown = () => {
    this.props.beginVolumeSeek();
  };

  handleVolumeMouseMove = (e) => {
    const newVolume = computeOffset(this.volumeBar, 1.0, e);
    this.props.updateVolume(newVolume);
  };

  handleVolumeMouseUp = (e) => {
    const newVolume = computeOffset(this.volumeBar, 1.0, e);
    this.props.updateVolumeAndEndSeek(newVolume);
  };

  render() {
    const { volume } = this.props;

    return (
      <Wrapper
        innerRef={(volumeBar) => {
          this.volumeBar = volumeBar;
        }}
      >
        <PlayerSlider
          minValue={0}
          maxValue={1.0}
          currentValue={volume}
          seekBarHeight="2px"
          seekBarColor={lighterGray}
          onProgressBarMouseUp={this.handleVolumeMouseUp}
          onProgressBarMouseDown={this.handleVolumeMouseDown}
          onSeekKnobMouseDown={this.handleVolumeMouseDown}
          onSeekKnobMouseUp={this.handleVolumeMouseUp}
        />
      </Wrapper>
    );
  }
}

PlayerVolumeSeekBar.propTypes = {
  volume: PropTypes.number.isRequired,
  volumeSeeking: PropTypes.bool.isRequired,
  beginVolumeSeek: PropTypes.func.isRequired,
  updateVolume: PropTypes.func.isRequired,
  updateVolumeAndEndSeek: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    volume: getCurrentVolume(state),
    volumeSeeking: isVolumeSeeking(state),
  };
}

export default connect(mapStateToProps, playerActions)(PlayerVolumeSeekBar);
