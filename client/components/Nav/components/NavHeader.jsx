import React from 'react';
import { HOST } from 'client/constants/AppConsts';

function NavHeader() {
  return (
    <div className="navbar-header">
      <a className="navbar-brand" href={HOST}>
        <span className="glyphicon glyphicon-headphones nav-icon" /><span>Redux Music</span>
      </a>
    </div>
  );
}

export default NavHeader;
