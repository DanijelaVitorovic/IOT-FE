import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';
import { locationPath } from '../../../constants/app-routes';
import withTranslations from '../../../utils/HighOrderComponent';

const navLogo = (props) => {
  let toggleClass = ['mobile-menu'];

  if (props.collapseMenu) {
    toggleClass = [...toggleClass, 'on'];
  }

  const { gt } = props || {};

  return (
    <Fragment>
      <div className="navbar-brand header-logo ml-auto">
        <Link to={locationPath.DASHBOARD} className="b-brand">
          <div className="b-bg">
            <i className="feather icon-trending-up" />
          </div>
          <span className="b-title">{gt.appName}</span>
        </Link>
        <a
          href="#!"
          className={toggleClass.join(' ')}
          id="mobile-collapse"
          onClick={props.onToggleNavigation}
        >
          <span />
        </a>
      </div>
    </Fragment>
  );
};

export default withTranslations(navLogo);
