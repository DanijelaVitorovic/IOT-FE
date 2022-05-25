import { columnTypes } from '../../constants/globals';

export const tableConfig = (props) => {
  const { editAction, deleteAction } = props || {};

  return {
    columns: [
      {
        key: 'roleName',
        width: '',
        className: '',
        type: columnTypes.value,
      },
      {
        key: 'actions',
        width: '',
        className: 'text-center',
        type: columnTypes.action,
        onClick: editAction,
        icon: 'fas fa-edit fa-2x',
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