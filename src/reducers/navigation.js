import { createSlice } from '@reduxjs/toolkit';
import { locationPath } from '../constants/app-routes';

const initialState = {
  isOpen: [], //for active default menu
  isTrigger: [], //for active default menu, set blank for horizontal
  defaultPath: `${locationPath.DASHBOARD}/default`,
  basename: '/datta-able/react/default', // only at build time to set, like /datta-able
  layout: 'vertical', // vertical, horizontal (not available in lite version)
  preLayout: null, // (not available in lite version)
  collapseMenu: false, // mini-menu
  layoutType: 'menu-light', // menu-dark, (menu-light, dark are not available in lite version)
  navIconColor: false,
  headerBackColor: 'header-default', // header-default, (header-blue, header-red, header-purple, header-lightblue, header-dark are not available in lite version)
  navBackColor: 'navbar-default', // navbar-default, (navbar-blue, navbar-red, navbar-purple, navbar-lightblue, navbar-dark are not available in lite version)
  navBrandColor: 'brand-default', // brand-default, (brand-blue, brand-red, brand-purple, brand-lightblue, brand-dark are not available in lite version)
  navBackImage: false, // not available in lite version
  rtlLayout: false, // not available in lite version
  navFixedLayout: true,
  headerFixedLayout: false, // not available in lite version
  boxLayout: false,
  navDropdownIcon: 'style1', // style1, (style2, style3 are not available in lite version)
  navListIcon: 'style1', // style1, (style2, style3, style4, style5, style6 are not available in lite version)
  navActiveListColor: 'active-default', // active-default, (active-blue, active-red, active-purple, active-lightblue, active-dark are not available in lite version)
  navListTitleColor: 'title-default', // title-default, (title-blue, title-red, title-purple, title-lightblue, title-dark are not available in lite version)
  navListTitleHide: false, // not available in lite version
  configBlock: false, // not available in lite version
  layout6Background:
    'linear-gradient(to right, #A445B2 0%, #D41872 52%, #FF0066 100%)', // used only for pre-layout = layout-6
  layout6BackSize: '', // used only for pre-layout = layout-6
};

let trigger = [];
let open = [];

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    collapseMenu(state) {
      state.collapseMenu = !state.collapseMenu;
    },
    collapseToggle(state, action) {
      const actionPayload = action.payload;
      if (actionPayload.menu.type === 'sub') {
        open = state.isOpen;
        trigger = state.isTrigger;

        const triggerIndex = trigger.indexOf(actionPayload.menu.id);
        if (triggerIndex > -1) {
          open = open.filter((item) => item !== actionPayload.menu.id);
          trigger = trigger.filter((item) => item !== actionPayload.menu.id);
        }

        if (triggerIndex === -1) {
          open = [...open, actionPayload.menu.id];
          trigger = [...trigger, actionPayload.menu.id];
        }
      } else {
        open = state.isOpen;
        const triggerIndex = state.isTrigger.indexOf(actionPayload.menu.id);
        trigger = triggerIndex === -1 ? [actionPayload.menu.id] : [];
        open = triggerIndex === -1 ? [actionPayload.menu.id] : [];
      }

      state.isOpen = open;
      state.isTrigger = trigger;
    },
    navCollapseLeave(state, action) {
      const actionPayload = action.payload;
      if (actionPayload.menu.type === 'sub') {
        open = state.isOpen;
        trigger = state.isTrigger;

        const triggerIndex = trigger.indexOf(actionPayload.menu.id);
        if (triggerIndex > -1) {
          open = open.filter((item) => item !== actionPayload.menu.id);
          trigger = trigger.filter((item) => item !== actionPayload.menu.id);
        }
      }

      state.isOpen = open;
      state.isTrigger = trigger;
    },
    navContentLeave(state) {
      state.isOpen = open;
      state.isTrigger = trigger;
    },
    changeLayout(state, action) {
      state.layout = action.payload.layout;
    },
  },
});

export const navigationActions = navigationSlice.actions;

export default navigationSlice.reducer;
