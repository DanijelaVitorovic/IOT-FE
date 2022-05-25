import React, { Fragment } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import NavGroup from './NavGroup';
const NavContent = (props) => {
  const navItems = props.navigation.map((item) => {
    switch (item.type) {
      case 'group':
        return (
          <NavGroup
            layout={props.layout}
            key={item.id}
            group={item}
            windowWidth={props.windowWidth}
          />
        );
      default:
        return false;
    }
  });

  const mainContent = (
    <div className="navbar-content datta-scroll">
      <PerfectScrollbar>
        <ul className="nav pcoded-inner-navbar">{navItems}</ul>
      </PerfectScrollbar>
    </div>
  );

  return <Fragment>{mainContent}</Fragment>;
};

export default NavContent;
