import React, { Fragment } from 'react';
import NavBar from '../NavBar';
import Navigation from '../Navigation';

const ThemeWrapper = (props) => {
  return (
    <Fragment>
      <Navigation />
      <NavBar />
      <div className="pcoded-main-container">
        <div className="pcoded-wrapper">
          <div className="pcoded-content">
            <div className="pcoded-inner-content">
              <div className="main-body">
                <div className="page-wrapper">{props.children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ThemeWrapper;
