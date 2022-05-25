import { columnTypes } from '../../constants/globals';

export const tableConfig = (props) => {
  const {
    editAction,
    deleteAction,
    editPasswordAction,
    setUserStatusActive,
    setUserStatusDeactive,
    isActiveOrPassive,
    setUserStatusDeactivate2fa,
    edit2faRegistrationWhenStatusPassive,
    isActiveOrPassive2FA,
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
      },
      {
        key: 'edit',
        width: '',
        className: 'text-center',
        type: columnTypes.action,
        onClick: editAction,
        icon: 'fas fa-edit fa-2x',
      },
      {
        key: 'updatePassword',
        width: '',
        className: 'text-center',
        type: columnTypes.action,
        onClick: editPasswordAction,
        icon: 'fas fa-lock fa-2x',
      },
      {
        key: 'changeStatus2fa',
        width: '',
        className: 'text-center',
        type: columnTypes.condition_action,
        actions: [
          {
            onClick_ca: setUserStatusDeactivate2fa?.action,
            icon_ca: 'fas fa-times-circle fa-2x',
            tooltipTitle_ca: setUserStatusDeactivate2fa?.tooltipTitle,
          },
          {
            onClick_ca: edit2faRegistrationWhenStatusPassive?.action,
            icon_ca: 'fas fa-play-circle fa-2x',
            tooltipTitle_ca: edit2faRegistrationWhenStatusPassive?.tooltipTitle,
          },
        ],
        actionCondition: isActiveOrPassive2FA,
      },
      {
        key: 'delete',
        width: '',
        className: 'text-center',
        type: columnTypes.action,
        onClick: deleteAction,
        icon: 'fas fa-trash-alt fa-2x',
      },
    ],
  };
};
