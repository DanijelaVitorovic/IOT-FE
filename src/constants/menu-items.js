import { locationPath } from './app-routes';
import { userActions } from './user-actions';

export const navigation = (translations) => {
  const translation = translations || {};

  return {
    items: [
      {
        id: 'navigation1',
        title: translation.userRequestPanel,
        type: 'group',
        icon: 'fas fa-user-tag',
        children: [
          {
            id: 'users',
            title: translation.userList,
            type: 'item',
            url: locationPath.USER_LIST,
            icon: 'fas fa-users',
            action: userActions.MENU_USER,
          },
          {
            id: 'roles',
            title: translation.roleList,
            type: 'item',
            url: locationPath.ROLE_LIST,
            icon: 'fas fa-user-tag',
            action: userActions.MENU_ROLE,
          },
          {
            id: 'fridges',
            title: translation.fridgeList,
            type: 'item',
            url: locationPath.FRIDGE_LIST,
            icon: 'fas fa-asterisk',
            action: userActions.MENU_FRIDGE,
          },
        ],
      },
    ],
  };
};
