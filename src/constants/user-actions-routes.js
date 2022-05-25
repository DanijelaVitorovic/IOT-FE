import { locationPath } from './app-routes';
import { userActions } from './user-actions';

const userActionRoutes = {
  [locationPath.USER_LIST]: userActions.MENU_USER,
  [locationPath.ROLE_LIST]: userActions.MENU_ROLE,
  [locationPath.FRIDGE_LIST]: userActions.MENU_FRIDGE,
};
export default userActionRoutes;
