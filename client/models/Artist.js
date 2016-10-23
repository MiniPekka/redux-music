import { Record } from 'immutable';
// import { camelizeKeys } from 'humps';

const ArtistRecord = Record({
  id: '',
  kind: '',
  permalink: '',
  username: '',
  lastModified: '',
  uri: '',
  permalinkUrl: '',
  avatarUrl: '',
  country: '',
  firstName: '',
  lastName: '',
  fullName: '',
  description: '',
  city: '',
  trackCount: 0,
  playlistCount: 0,
  followersCount: 0,
  followingsCount: 0
});

class Artist extends ArtistRecord {
  getId() {
    return this.get('id').toString();
  }

  getKind() {
    return this.get('kind');
  }

  getUsername() {
    return this.get('username');
  }

  getAvatarUrl() {
    return this.get('avatarUrl');
  }

  getDescription() {
    return this.get('description');
  }

  getFollowersCount() {
    return this.get('followersCount');
  }
}

export default Artist;