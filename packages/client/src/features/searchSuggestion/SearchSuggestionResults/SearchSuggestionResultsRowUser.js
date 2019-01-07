import { connect } from 'react-redux';
import { getUserById } from '@soundnode-redux/client/src/features/entities/entitiesSelectors';
import { USER_PROFILE_ROUTE } from '@soundnode-redux/client/src/common/constants/routeConsts';
import SearchSuggestionResultsRow from './SearchSuggestionResultsRow';

const mapStateToProps = (state, props) => {
  const { userId } = props;
  const { avatarUrl, username } = getUserById(state, userId);
  return {
    type: 'user',
    avatarUrl,
    linkUrl: `${USER_PROFILE_ROUTE}/${userId}`,
    title: username,
    subtitle: 'Artist',
  };
};

export default connect(mapStateToProps)(SearchSuggestionResultsRow);
