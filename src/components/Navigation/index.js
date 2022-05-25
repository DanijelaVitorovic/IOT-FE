import React, { useContext, useEffect, forwardRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import windowSize from 'react-window-size';
import NavLogo from './NavLogo';
import NavContent from './NavContent';
import OutsideClick from './OutsideClick';
import { navigation } from '../../constants/menu-items';
import withTranslations from '../../utils/HighOrderComponent';
import AuthContext from '../../store/auth_context';
import { navigationActions } from '../../reducers/navigation';
import PerfectScrollbar from 'react-perfect-scrollbar';

const Navigation = forwardRef((props, ref) => {
  const { allowedActions, validToken } = useContext(AuthContext);
  const dispatch = useDispatch();
  const {
    layout,
    preLayout,
    collapseMenu,
    layoutType,
    navBackColor,
    navBackImage,
    navIconColor,
    navBrandColor,
    layout6Background,
    layout6BackSize,
    rtlLayout,
    navFixedLayout,
    boxLayout,
    navDropdownIcon,
    navListIcon,
    navActiveListColor,
    navListTitleColor,
    navListTitleHide,
  } = useSelector((state) => state.navigationReducer);

  const resize = useCallback(() => {
    const contentWidth = document.getElementById('root').clientWidth;
    if (layout === 'horizontal' && contentWidth < 992) {
      dispatch(navigationActions.changeLayout('vertical'));
    }
  }, [dispatch, layout]);
  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [resize]);

  const isEmpty = (item) => item && Object.keys(item).length > 0;

  const getAllowedNavigationItems = (navItems, allowedActions, isArray) => {
    const filterNavItems = navItems
      .map((item) => {
        const { children } = item || {};

        const filteredChildren = children
          ?.map((child) => {
            if (child.type === 'collapse') {
              return getAllowedNavigationItems([child], allowedActions, true);
            }
            return allowedActions?.includes(child.action) ? child : {};
          })
          .filter(isEmpty);

        return (
          filteredChildren &&
          filteredChildren.length > 0 && {
            ...item,
            children: filteredChildren,
          }
        );
      })
      .filter(isEmpty);

    return isArray ? filterNavItems[0] : filterNavItems;
  };

  const allowedNavigationItems = getAllowedNavigationItems(
    navigation(props.t).items,
    allowedActions
  );

  let navClass = ['pcoded-navbar'];

  if (
    preLayout !== null &&
    preLayout !== '' &&
    preLayout !== 'layout-6' &&
    preLayout !== 'layout-8'
  ) {
    navClass = [...navClass, preLayout];
  } else {
    navClass = [
      ...navClass,
      layoutType,
      navBackColor,
      navBrandColor,
      'drp-icon-' + navDropdownIcon,
      'menu-item-icon-' + navListIcon,
      navActiveListColor,
      navListTitleColor,
    ];

    if (layout === 'horizontal') {
      navClass = [...navClass, 'theme-horizontal'];
    }

    if (navBackImage) {
      navClass = [...navClass, navBackImage];
    }

    if (navIconColor) {
      navClass = [...navClass, 'icon-colored'];
    }

    if (!navFixedLayout) {
      navClass = [...navClass, 'menupos-static'];
    }

    if (navListTitleHide) {
      navClass = [...navClass, 'caption-hide'];
    }
  }

  if (props.windowWidth < 992 && collapseMenu) {
    navClass = [...navClass, 'mob-open'];
  } else if (collapseMenu) {
    navClass = [...navClass, 'navbar-collapsed'];
  }

  if (preLayout === 'layout-6') {
    document.body.classList.add('layout-6');
    document.body.style.backgroundImage = layout6Background;
    document.body.style.backgroundSize = layout6BackSize;
  }

  if (preLayout === 'layout-8') {
    document.body.classList.add('layout-8');
  }

  if (layoutType === 'dark') {
    document.body.classList.add('datta-dark');
  } else {
    document.body.classList.remove('datta-dark');
  }

  if (rtlLayout) {
    document.body.classList.add('datta-rtl');
  } else {
    document.body.classList.remove('datta-rtl');
  }

  if (boxLayout) {
    document.body.classList.add('container');
    document.body.classList.add('box-layout');
  } else {
    document.body.classList.remove('container');
    document.body.classList.remove('box-layout');
  }

  const onToggleNavigationHandler = () => {
    dispatch(navigationActions.collapseMenu());
  };

  const navContent =
    props.windowWidth < 992 ? (
      <PerfectScrollbar>
        <OutsideClick
          windowWidth={props.windowWidth}
          collapseMenu={collapseMenu}
          onToggleNavigation={onToggleNavigationHandler}
        >
          <NavContent
            navigation={allowedNavigationItems}
            windowWidth={props.windowWidth}
            layout={layout}
          />
        </OutsideClick>
      </PerfectScrollbar>
    ) : (
      <NavContent
        navigation={allowedNavigationItems}
        windowWidth={props.windowWidth}
        layout={layout}
      />
    );

  return (
    validToken && (
      <nav className={`wrapper-fade-in ${navClass.join(' ')}`}>
        <div className="navbar-wrapper">
          <NavLogo
            collapseMenu={collapseMenu}
            windowWidth={props.windowWidth}
            onToggleNavigation={onToggleNavigationHandler}
          />
          {navContent}
        </div>
      </nav>
    )
  );
});

export default withTranslations(windowSize(Navigation), 'menu_items');
