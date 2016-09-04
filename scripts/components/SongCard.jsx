import React, { Component} from 'react';

class SongCard extends Component {

  constructor (props) {
    super(props);
    this.renderTogglePlayButton = this.renderTogglePlayButton.bind(this);
  }

  renderTogglePlayButton () {
    const {song, player, isActive, handlePauseSong, handleChangeSong} = this.props;

    // If current song is the active playing/paused song, toggling only change the playing state in player.
    // If current song is not the active playing song, except for toggling isPlaying state,
    // we also need to get the actual dom and call play()/pause()

    if (player.song !== null && player.song.id === song.id && player.isPlaying) {
      return (
        <div className={`toggle-play-button ${(isActive ? 'active' : '')}`} onClick={handlePauseSong}>
          <i className="toggle-play-button-icon ion-ios-pause" />
        </div>
      );
    } else {
      return (
        <div className={`toggle-play-button ${(isActive ? 'active' : '')}`} onClick={handleChangeSong.bind(null, song)}>
          <i className="toggle-play-button-icon ion-ios-play" />
        </div>
      );
    }
  }

  render() {
    const {song, player, isActive} = this.props;
    let imageUrl = song.artwork_url ? song.artwork_url.replace('large', 't300x300') : '';

    return (
      <div className={`card song-card ${(isActive ? 'active' : '')}`}>
        <div className="song-card-image" style={{ backgroundImage: `url(${imageUrl})` }}>
          {this.renderTogglePlayButton()}
        </div>
        <div className="song-card-user clearfix">
          <img
            className="song-card-user-image"
            src={song.user.avatar_url}
          />
          <div className="song-card-details">
            <a className="song-card-title">
              {song.title}
            </a>
            <a className="song-card-user-username">
              {song.user.username}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default SongCard;
