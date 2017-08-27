import { SIDEBAR_TOGGLE, SIDEBAR_TAB_SELECT, SIDEBAR_TAB_RESET } from './sidebarActionTypes';

/* Reducer */
const initialState = {
  hidden: true,
  selectedTab: 'Top 50',
};

function toggleSidebar(state) {
  return {
    ...state,
    hidden: !state.hidden,
  };
}

function selectTab(state, { tabName }) {
  return {
    ...state,
    selectedTab: tabName,
  };
}

function resetTab() {
  return {
    ...initialState,
  };
}

export default function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case SIDEBAR_TOGGLE:
      return toggleSidebar(state);
    case SIDEBAR_TAB_SELECT:
      return selectTab(state, action.payload);
    case SIDEBAR_TAB_RESET:
      return resetTab();
    default:
      return state;
  }
}