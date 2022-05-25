import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigationActions } from '../../../../reducers/navigation';
import { NavLink } from 'react-router-dom';
import NavIcon from '../NavIcon';
import NavBadge from '../NavBadge';

const NavItem = (props) => {
  const dispatch = useDispatch();
  const { layout } = useSelector((state) => state.navigationReducer);
  let itemTitle = props.item.title;
  if (props.item.icon) {
    itemTitle = <span className="pcoded-mtext">{props.item.title}</span>;
  }

  let itemTarget = '';
  if (props.item.target) {
    itemTarget = '_blank';
  }

  let subContent;
  if (props.item.external) {
    subContent = (
      <a href={props.item.url} target="_blank" rel="noopener noreferrer">
        <NavIcon items={props.item} />
        {itemTitle}
        <NavBadge layout={layout} items={props.item} />
      </a>
    );
  } else {
    subContent = (
      <NavLink
        to={props.item.url}
        className="nav-link"
        exact={true}
        target={itemTarget}
      >
        <NavIcon items={props.item} />
        {itemTitle}
        <NavBadge layout={layout} items={props.item} />
      </NavLink>
    );
  }

  const onItemClickHandler = () => {
    dispatch(navigationActions.collapseMenu());
  };

  let mainContent = '';

  if (props.windowWidth < 992) {
    mainContent = (
      <li className={props.item.classes} onClick={onItemClickHandler}>
        {subContent}
      </li>
    );
  } else {
    mainContent = <li className={props.item.classes}>{subContent}</li>;
  }

  return <Fragment>{mainContent}</Fragment>;
};

export default NavItem;
