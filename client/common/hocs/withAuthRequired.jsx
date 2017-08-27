import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from 'features/auth/authUtils';
import { notificationWarning } from 'features/notification/notificationActions';
import { resetSidebarTab } from 'features/sidebar/sidebarActions';
import { getDisplayName } from 'common/utils/hocUtils';

export default function withAuthRequired(WrappedComponent) {
  class EnhancedComponent extends Component {
    componentDidMount() {
      if (!isAuthenticated()) {
        this.props.resetSidebarTab();
        this.props.notificationWarning('Please Signin with SoundCloud First');
      }
    }

    render() {
      const authed = isAuthenticated();
      return authed ? <WrappedComponent {...this.props} /> : <Redirect to="/" />;
    }
  }

  EnhancedComponent.propTypes = {
    notificationWarning: PropTypes.func.isRequired,
    resetSidebarTab: PropTypes.func.isRequired,
  };

  EnhancedComponent.displayName = `withAuthReqired(${getDisplayName(WrappedComponent)})`;

  const actions = {
    notificationWarning,
    resetSidebarTab,
  };

  return connect(null, actions)(EnhancedComponent);
}
