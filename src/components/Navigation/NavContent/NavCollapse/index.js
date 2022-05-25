import React, { Fragment, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavIcon from '../NavIcon';
import NavBadge from '../NavBadge';
import NavItem from '../NavItem';
import LoopNavCollapse from './index';
import { navigationActions } from '../../../../reducers/navigation';

const NavCollapse = (props) => {
  const { collapse, type } = props || {};
  const dispatch = useDispatch();
  const { layout, isOpen, isTrigger } = useSelector(
    (state) => state.navigationReducer
  );

  const onCollapseToggleHandler = useCallback(() => {
    dispatch(
      navigationActions.collapseToggle({
        menu: { id: collapse.id, type: type },
      })
    );
  }, [dispatch, collapse.id, type]);

  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === collapse.id);
    if (currentIndex > -1) {
      onCollapseToggleHandler();
    }
  }, [onCollapseToggleHandler, collapse.id]);

  let navItems = '';
  if (collapse.children) {
    const collapses = collapse.children;
    navItems = Object.keys(collapses).map((item) => {
      item = collapses[item];
      switch (item.type) {
        case 'collapse':
          return <LoopNavCollapse key={item.id} collapse={item} type="sub" />;
        case 'item':
          return <NavItem layout={layout} key={item.id} item={item} />;
        default:
          return false;
      }
    });
  }

  let itemTitle = props.collapse.title;
  if (props.collapse.icon) {
    itemTitle = <span className="pcoded-mtext">{props.collapse.title}</span>;
  }

  let navLinkClass = ['nav-link'];

  let navItemClass = ['nav-item', 'pcoded-hasmenu'];
  const openIndex = isOpen.findIndex((id) => id === props.collapse.id);
  if (openIndex > -1) {
    navItemClass = [...navItemClass, 'active'];
    if (layout !== 'horizontal') {
      navLinkClass = [...navLinkClass, 'active'];
    }
  }

  const triggerIndex = isTrigger.findIndex((id) => id === props.collapse.id);
  if (triggerIndex > -1) {
    navItemClass = [...navItemClass, 'pcoded-trigger'];
  }

  const currentIndex = document.location.pathname
    .toString()
    .split('/')
    .findIndex((id) => id === collapse.id);
  if (currentIndex > -1) {
    navItemClass = [...navItemClass, 'active'];
    if (layout !== 'horizontal') {
      navLinkClass = [...navLinkClass, 'active'];
    }
  }

  const subContent = (
    <Fragment>
      <a
        href="#!"
        className={navLinkClass.join(' ')}
        onClick={onCollapseToggleHandler}
      >
        <NavIcon items={props.collapse} />
        {itemTitle}
        <NavBadge layout={layout} items={props.collapse} />
      </a>
      <ul className="pcoded-submenu">{navItems}</ul>
    </Fragment>
  );
  let mainContent = <li className={navItemClass.join(' ')}>{subContent}</li>;

  return <Fragment>{mainContent}</Fragment>;
};

export default NavCollapse;
