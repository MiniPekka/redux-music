import { connect } from 'react-redux';
// import { browserHistory } from 'react-router-dom';
import {
  isDropdownShown,
  getDropdownSearchArtistIds,
  getDropdownSearchTrackIds,
  requestDropdownSearch,
  // sagaDropdownSearch,
  sagaSearch,
  clearAndHideSearchResults,
} from 'client/redux/modules/search';

import NavSearch from '../components/NavSearch';

const mapStateToProps = state => ({
  dropdownShown: isDropdownShown(state),
  artistIds: getDropdownSearchArtistIds(state),
  trackIds: getDropdownSearchTrackIds(state),
});

const mapDispatchToProps = dispatch => ({
  handleChange(keywords) {
    if (keywords.trim() === '') dispatch(clearAndHideSearchResults());
    else dispatch(requestDropdownSearch(keywords));
    // else dispatch(sagaDropdownSearch(keywords));
  },

  handleBlur() {
    dispatch(clearAndHideSearchResults());
  },

  handleFocus(keywords) {
    if (keywords.trim() === '') dispatch(clearAndHideSearchResults());
    else dispatch(requestDropdownSearch(keywords));
  },

  handleShowAll(rawKeywords) {
    const keywords = rawKeywords.toLowerCase().trim();
    if (keywords !== '') {
      dispatch(clearAndHideSearchResults());
      // browserHistory.push({
      //   pathname: '/search',
      //   query: { q: keywords },
      // });
      dispatch(sagaSearch(keywords));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavSearch);