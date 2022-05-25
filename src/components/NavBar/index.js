import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigationActions } from '../../reducers/navigation';
import NavRight from './NavRight';
import { Link } from 'react-router-dom';
import withTranslations from '../../utils/HighOrderComponent';
import { locationPath } from '../../constants/app-routes';

const NavBar = (props) => {
  const dispatch = useDispatch();
  const { headerBackColor, headerFixedLayout, collapseMenu } = useSelector(
    (state) => state.navigationReducer
  );
  const { gt } = props || {};

  const onToggleNavigationHandler = () => {
    dispatch(navigationActions.collapseMenu());
  };

  let headerClass = [
    'navbar',
    'pcoded-header',
    'navbar-expand-lg',
    headerBackColor,
  ];
  if (headerFixedLayout) {
    headerClass = [...headerClass, 'headerpos-fixed'];
  }

  let toggleClass = ['mobile-menu'];
  if (collapseMenu) {
    toggleClass = [...toggleClass, 'on'];
  }

  return (
    <Fragment>
      <header className={headerClass.join(' ')}>
        <div className="m-header">
          <Link
            className={toggleClass.join(' ')}
            id="mobile-collapse1"
            to="#"
            onClick={onToggleNavigationHandler}
          >
            <span />
          </Link>
          <Link to={locationPath.DASHBOARD} className="b-brand">
            <div className="b-bg">
              <i className="feather icon-trending-up" />
            </div>
            <span className="b-title">{gt.appName}</span>
          </Link>
        </div>
        <Link className="mobile-menu" id="mobile-header" to="#">
          <i className="feather icon-more-horizontal" />
        </Link>
        <div className="collapse navbar-collapse">
          <NavRight gt={gt} />
        </div>
      </header>
    </Fragment>
  );
};

export default withTranslations(NavBar);
