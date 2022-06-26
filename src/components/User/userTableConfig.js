import { columnTypes } from '../../constants/globals';

export const tableConfig = (props) => {
  const {
    editAction,
    deleteAction,
    editPasswordAction,
    setUserStatusActive,
    setUserStatusDeactive,
    isActiveOrPassive,
    isActionUserUpdateAllowed,
    isActionUserDeleteAllowed,
  } = props || {};

  return {
    columns: [
      {
        key: 'username',
        width: '',
        className: '',
        type: columnTypes.value,
      },
      {
        key: 'firstName',
        width: '',
        className: 'text-center',
        type: columnTypes.value,
      },
      {
        key: 'lastName',
        width: '',
        className: 'text-center',
        type: columnTypes.value,
      },
      {
        key: 'activateDeactivate',
        width: '',
        className: 'text-center',
        type: columnTypes.condition_action,
        actions: [
          {
            onClick_ca: setUserStatusDeactive?.action,
            icon_ca: 'fas fa-times-circle fa-2x',
            tooltipTitle_ca: setUserStatusDeactive?.tooltipTitle,
          },
          {
            onClick_ca: setUserStatusActive?.action,
            icon_ca: 'fas fa-play-circle fa-2x',
            tooltipTitle_ca: setUserStatusActive?.tooltipTitle,
          },
        ],
        actionCondition: isActiveOrPassive,
        condition: isActionUserUpdateAllowed,
      },
      {
        key: 'edit',
        width: '',
        className: 'text-center',
        type: columnTypes.action,
        onClick: editAction,
        condition: isActionUserUpdateAllowed,
        icon: 'fas fa-edit fa-2x',
      },
      {
        key: 'updatePassword',
        width: '',
        className: 'text-center',
        type: columnTypes.action,
        onClick: editPasswordAction,
        condition: isActionUserUpdateAllowed,
        icon: 'fas fa-lock fa-2x',
      },
      {
        key: 'delete',
        width: '',
        className: 'text-center',
        type: columnTypes.action,
        onClick: deleteAction,
        condition: isActionUserDeleteAllowed,
        icon: 'fas fa-trash-alt fa-2x',
      },
    ],
  };
};
