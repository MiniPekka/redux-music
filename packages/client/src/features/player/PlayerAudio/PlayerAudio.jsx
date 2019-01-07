import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { REPEAT } from '@soundnode-redux/client/src/features/player/playerConsts';
import { connect } from 'react-redux';
import * as actions from '@soundnode-redux/client/src/features/player/playerActions';
import * as selectors from '@soundnode-redux/client/src/features/player/playerSelectors';

class PlayerAudio extends Component {
  componentDidMount() {
    this.togglePlayIfNeeded(this.audio, this.props);
  }

  componentDidUpdate(prevProps) {
    this.updateTimeIfNeeded(prevProps);
    this.updateVolumeIfNeeded(prevProps);
    this.togglePlayIfNeeded(this.audio);
  }

  // If seeking status changed from true to false, then we should update time in our audio
  updateTimeIfNeeded = (prevProps) => {
    if (prevProps.seeking && !this.props.seeking) {
      this.audio.currentTime = this.props.currentTime;
    }
    // Reason: In case of repeat mode, when user click next/prev song button,
    // we will update currentTime to 0, so we need to force update the actual
    // time of our player.
    if (prevProps.currentTime !== 0 && this.props.currentTime === 0) {
      this.audio.currentTime = this.props.currentTime;
    }
  };

  updateVolumeIfNeeded = (prevProps) => {
    if (prevProps.volume !== this.props.volume) {
      this.audio.volume = this.props.volume;
    }
  };

  togglePlayIfNeeded = (audio) => {
    if (this.props.loading) {
      // Set a little bit of delay to give some time for song to load.
      setTimeout(() => {
        audio
          .play()
          .then(() => {
            this.props.playSong();
          })
          .catch((err) => {
            // console.log('Track not playable');
            console.error(err);
            this.props.handleStreamError();
          });
      }, 500);
    } else if (!this.props.playing && !audio.paused) {
      // When the signal is pause and the audio is playing, it means we need to pause the audio.
      audio.pause();
    } else if (audio.paused && this.props.playing) {
      // When we click play button on a paused audio.
      setTimeout(() => {
        audio.play().catch((err) => {
          // console.log('Track not playable');
          console.error(err);
          this.props.handleStreamError();
        });
      }, 500);
    }
  };

  handleTimeUpdate = (e) => {
    this.props.updateTimeOnPlay(e.target.currentTime);
  };

  handleEnded = () => {
    this.props.playNextSong();
  };

  render() {
    const { streamUrl, mode } = this.props;
    return (
      <audio
        id="audio"
        loop={mode === REPEAT}
        ref={(ref) => {
          this.audio = ref;
        }}
        src={streamUrl}
        onEnded={this.handleEnded}
        onTimeUpdate={this.handleTimeUpdate}
      />
    );
  }
}

PlayerAudio.propTypes = {
  loading: PropTypes.bool.isRequired,
  seeking: PropTypes.bool.isRequired,
  currentTime: PropTypes.number.isRequired,
  playing: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  mode: PropTypes.string.isRequired,
  streamUrl: PropTypes.string.isRequired,
  updateTimeOnPlay: PropTypes.func.isRequired,
  playNextSong: PropTypes.func.isRequired,
  playSong: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    playing: selectors.isPlayerPlaying(state),
    loading: selectors.isPlayerLoading(state),
    volume: selectors.getCurrentVolume(state),
    mode: selectors.getPlayerMode(state),
    streamUrl: selectors.getPlayerStreamUrl(state),
    currentTime: selectors.getCurrentTime(state),
    seeking: selectors.isPlayerSeeking(state),
  };
}

export default connect(mapStateToProps, actions)(PlayerAudio);
